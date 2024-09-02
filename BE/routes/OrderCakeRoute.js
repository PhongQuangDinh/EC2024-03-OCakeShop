const express = require("express");
const router = express.Router();
const model = require('../models');
const { Op } = require('sequelize');
const {authenticateToken} = require('../routes/authenticationRoute')
// import { getApiUrl } from '../../FE/ocake-shop/WebConfig';

// Lấy đơn đặt hàng
router.get("/manage", async (req, res, next) => {
  try {
    const order = await model.OrderCakeDetail.findAll({
      where: {
        bakingStatus: 'Chưa xử lý',
      },
      include: [
        {
          model: model.OrderCake,
          as: "OrderDetails",
          required: true,
          where: {pickUpTime:
            {
              [Op.gte]: new Date() 
            }
          }
        },
        {
          model: model.Cart,
          as: "OrderCart",
          required: true,
          where:{status: "Đã mua"},
          include: [
            {
              model: model.Cake,
              required: true,
            },
            {
              model: model.CakeSize,
              as: "cakeSize",
              required: true,
            },
            {
              model: model.CakeFilling,
              as: "cakeFilling",
              required: true,
            }
          ]
        }
      ],
      order: [["arrange", "ASC"]],
    });
    if(order.length()<=0){
      res.status(403).json({message: "order cake not found"});
    }
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});

// router.post("/add-order-detail", authenticateToken, async (req, res, next) => {
//   try {
//     const orderCakeDetails = req.body;
//     // console.log(orderCake);
//     const {cartID, orderCakeID} = orderCakeDetail;
//     const orderCakes = await model.OrderCake.findAll();
//     const arrange = Math.max(...orderCakes.map(order => order.arrange)) + 1;
//     // const newOrderCake = await model.OrderCake.create({orderTime, arrange, deliveryStatus: "Chưa vận chuyển", receiveStatus: "Chưa nhận hàng", handleStatus: "Chưa xử lý"})
//     // if(!newOrderCake){
//     //   return res.status(400).json({message: "Failed to create order"})
//     // }
//     // return res.status(200).json(newOrderCake);
//   } catch (err) {
//     next(err);
//   }
// });

router.post("/add-order-detail", authenticateToken, async (req, res, next) => {
  try {
    const orderCakeDetails = req.body; // Nhận mảng các đối tượng {cartItem, orderCakeID}
    
    const arrange_OrderCakeDetail = await model.OrderCakeDetail.findAll();
    // const maxArrange = Math.max(...orderCakes.map(order => order.arrange)) || 0;
    let maxArrange = Math.max(...arrange_OrderCakeDetail.map(order => order.arrange)) || 0;
    for (const orderCakeDetail of orderCakeDetails) {
      const { cartItem, orderCakeID } = orderCakeDetail;
      
      const cartID = cartItem.cartID;

      const arrange = maxArrange + 1;

      const newOrderCakeDetail = await model.OrderCakeDetail.create({
        cartID, 
        orderCakeID, 
        arrange,
        handleStatus: "Chưa xử lý",
        bakingStatus: "Chưa xử lý"
      });

      if (!newOrderCakeDetail) {
        return res.status(400).json({ message: "Failed to create order cake detail" });
      }
    }

    return res.status(200).json({ message: "Successfully created order cake details" });
  } catch (err) {
    next(err);
  }
});


router.post("/add-order", authenticateToken, async (req, res, next) => {
  try {
    const orderCake = req.body;
    // console.log(orderCake);
    const {pickUpTime} = orderCake;
    const orderCakes = await model.OrderCake.findAll();
    const newOrderCake = await model.OrderCake.create({pickUpTime, deliveryStatus: "Chưa vận chuyển", receiveStatus: "Chưa nhận hàng", handleStatus: "Chưa xử lý"})
    if(!newOrderCake){
      return res.status(400).json({message: "Failed to create order"})
    }
    return res.status(200).json(newOrderCake);
  } catch (err) {
    next(err);
  }
});

router.post("/manage/update", authenticateToken, async (req, res, next) => {
  try {
    const orderCakeDetails = req.body;
    console.log(orderCakeDetails);
    // const { OrderCakeDetailID, bakingStatus, handleStatus, cartID, OrderCakeID, arrange} = OrderCakeDetail;
    // const order = await model.OrderCakeDetail.findAll({
    // });
    for (const orderCakeDetail of orderCakeDetails) {
      const { orderCakeDetailID, arrange } = orderCakeDetail;
    
      try {
        const [updateRows] = await model.OrderCakeDetail.update(
          {
            handleStatus: "Đã xử lý",
            arrange: arrange
          },
          {
            where: {orderCakeDetailID: orderCakeDetailID }
          }
        );
        if(updateRows === 0){
          return res.status(400).json({message: "OrderCakeDetail not found"})
        }
        const updatedOrderCakeDetail = await model.OrderCakeDetail.findOne({
          where: {orderCakeDetailID: orderCakeDetailID}
        });
        res.status(200).json(updatedOrderCakeDetail);
      } catch (err) {
        console.error(`Failed to update OrderCakeDetailID ${orderCakeDetailID}:`, err);
      }
    }
    res.status(200).json({"Message": "Success"});
  } catch (err) {
    next(err);
  }
});

router.get("/admin-delivered", async (req, res, next) => {
  try {
    const deliveredOrders = await model.OrderCake.findAll({
      where: {
        deliveryStatus: "Đã vận chuyển",
      },
      include: [
        {
          model: model.OrderCakeDetail,
          as: 'OrderDetails',
          include: [
            {
              model: model.Cart,
              as: 'OrderCart',
              include: [
                {
                  model: model.Customer,
                  as: 'customer',
                  attributes: ['name', 'phoneNumber']
                }
              ],
              attributes: ['priceCake', 'pickUpTime', 'status']
            }
          ]
        },
        {
          model: model.Payment,
          as: 'Payment',
        }
      ],
    });

    // Định dạng dữ liệu và lọc đơn hàng không đầy đủ thông tin
    const formattedOrders = deliveredOrders.map(order => {
      const customerName = order.OrderDetails[0]?.OrderCart?.customer?.name;
      const customerPhone = order.OrderDetails[0]?.OrderCart?.customer?.phoneNumber;

      // Kiểm tra nếu customerName và customerPhone đều không phải 'N/A'
      if (customerName && customerPhone) {
        return {
          orderCakeID: order.orderCakeID,
          customerName: customerName,
          customerPhone: customerPhone,
          pickUpTime: order.OrderDetails[0]?.OrderCart?.pickUpTime,
          receiveStatus: order.receiveStatus,
          orderDetails: order.OrderDetails,
          payment: order.Payment
        };
      }

      return null; // Trả về null nếu thông tin không đầy đủ
    }).filter(order => order !== null); // Lọc bỏ các đơn hàng có giá trị null

    res.status(200).json(formattedOrders);
  } catch (err) {
    next(err);
  }
});

router.get("/admin-not-delivered", async (req, res, next) => {
  try {
    const notDeliveredOrders = await model.OrderCake.findAll({
      where: {
        deliveryStatus: "Chưa vận chuyển", // Hoặc giá trị tương ứng với trạng thái chưa giao
      },
      include: [
        {
          model: model.OrderCakeDetail,
          as: "OrderDetails",
          include: [
            {
              model: model.Cart,
              as: "OrderCart",
              include: [
                {
                  model: model.Customer,
                  as: "customer",
                  attributes: ['name', 'phoneNumber']
                }
              ],
              attributes: ['priceCake', 'pickUpTime', 'status']
            }
          ]
        },
        {
          model: model.Payment,
          as: "Payment",
        }
      ],
    });

    // Định dạng dữ liệu và lọc đơn hàng không đầy đủ thông tin
    const formattedOrders = notDeliveredOrders.map(order => {
      const customerName = order.OrderDetails[0]?.OrderCart?.customer?.name;
      const customerPhone = order.OrderDetails[0]?.OrderCart?.customer?.phoneNumber;

      // Kiểm tra nếu customerName và customerPhone đều không phải 'N/A'
      if (customerName && customerPhone) {
        return {
          orderCakeID: order.orderCakeID,
          customerName: customerName,
          customerPhone: customerPhone,
          pickUpTime: order.OrderDetails[0]?.OrderCart?.pickUpTime,
          receiveStatus: order.receiveStatus,
          orderDetails: order.OrderDetails,
          payment: order.Payment
        };
      }

      return null; // Trả về null nếu thông tin không đầy đủ
    }).filter(order => order !== null); // Lọc bỏ các đơn hàng có giá trị null

    res.status(200).json(formattedOrders);
  } catch (err) {
    next(err);
  }
});


router.get("/cus-received", authenticateToken, async (req, res, next) => {
  try {
    const userID = req.user.userID;
    const deliveredOrders = await model.OrderCake.findAll({
      where: {
        receiveStatus: 'Đã nhận hàng'
      },
      include: [
        {
          model: model.OrderCakeDetail,
          as: 'OrderDetails',
          required: true,
          include: [
            {
              model: model.Cart,
              as: "OrderCart",
              required: true,
              include: [
                {
                 model: model.Customer,
                 as: "customer",
                 required: true,
                 where: { userID }
                 },
                {
                  model: model.CakeSize,
                  as: "cakeSize",
                  required: true,
                  attributes: ['title', 'description']
                },
                {
                  model: model.CakeFilling,
                  as: "cakeFilling",
                  required: true,
                  attributes: ['title', 'description']
                },
                {
                  model: model.Cake,
                  attributes: ['description']
                }
              ]
            }
          ]
        }
      ]
    });

    // Xử lý dữ liệu để chỉ lấy các trường bạn cần với giá trị mặc định
    const formattedOrders = deliveredOrders.map(order => {
      return order.OrderDetails.map(detail => {
        const cart = detail.OrderCart;
        return {
          orderCakeID: order.orderCakeID || '', // Thêm trường orderCakeID
          cakeName: cart.Cake?.description || '', // Bánh
          cakeSize: cart.cakeSize?.title || '', // Kích thước bánh
          cakeFilling: cart.cakeFilling?.title || '', // Nhân bánh
          quantity: cart.quantity || '', // Số lượng
          pickUpTime: cart.pickUpTime || '', // Thời gian lấy hàng
          receiveStatus: order.receiveStatus || '', // Trạng thái nhận hàng
          customerID: cart.customer?.customerID || '', // ID khách hàng
          customerName: cart.customer?.name || '' // Tên khách hàng
        };
      });
    }).flat();

    res.json(formattedOrders);
  } catch (error) {
    next(error);
  }
});


router.get("/cus-not-received", authenticateToken, async (req, res, next) => {
  try {
    const userID = req.user.userID;
    const deliveredOrders = await model.OrderCake.findAll({
      where: {
        receiveStatus: 'Chưa nhận hàng'
      },
      include: [
        {
          model: model.OrderCakeDetail,
          as: 'OrderDetails',
          required: true,
          include: [
            {
              model: model.Cart,
              as: "OrderCart",
              required: true,
              include: [
                {
                 model: model.Customer,
                 as: "customer",
                 required: true,
                 where: { userID }
                 },
                {
                  model: model.CakeSize,
                  as: "cakeSize",
                  required: true,
                  attributes: ['title', 'description']
                },
                {
                  model: model.CakeFilling,
                  as: "cakeFilling",
                  required: true,
                  attributes: ['title', 'description']
                },
                {
                  model: model.Cake,
                  attributes: ['description']
                }
              ]
            }
          ]
        }
      ]
    });

    // Xử lý dữ liệu để chỉ lấy các trường bạn cần với giá trị mặc định
    const formattedOrders = deliveredOrders.map(order => {
      return order.OrderDetails.map(detail => {
        const cart = detail.OrderCart;
        return {
          orderCakeID: order.orderCakeID || '', // Thêm trường orderCakeID
          cakeName: cart.Cake?.description || '', // Bánh
          cakeSize: cart.cakeSize?.title || '', // Kích thước bánh
          cakeFilling: cart.cakeFilling?.title || '', // Nhân bánh
          quantity: cart.quantity || '', // Số lượng
          pickUpTime: cart.pickUpTime || '', // Thời gian lấy hàng
          receiveStatus: order.receiveStatus || '', // Trạng thái nhận hàng
          customerID: cart.customer?.customerID || '', // ID khách hàng
          customerName: cart.customer?.name || '' // Tên khách hàng
        };
      });
    }).flat();

    res.json(formattedOrders);
  } catch (error) {
    next(error);
  }
});

// Lấy danh sách đơn hàng đã được thanh toán
router.get("/paid-order", async (req, res, next) => {
  try {
    const paidOrders = await model.OrderCake.findAll({
      include: [
        {
          model: model.Payment,
          required: false, // This keeps the LEFT JOIN
        },
      ],
      where: {
        '$Payment.paymentID$': {
          [Op.not]: null, // This filters for records where paymentID is not null in the joined Payment table
        },
      },
    });
    
    // Trả về kết quả dưới dạng JSON
    res.status(200).json(paidOrders);
  } catch (err) {
    // Xử lý lỗi và chuyển đến middleware lỗi tiếp theo
    next(err);
  }
});

// lấy danh sách đơn hàng chưa được thanh toán
router.get("/unpaid-order", async (req, res, next) => {
  try {
    const unpaidOrders = await model.OrderCake.findAll({
      include: [
        {
          model: model.Payment,
          required: false, // This makes the join a LEFT JOIN
          where: {
            paymentID: null, // This filters for records where paymentID is null
          },
        },
      ],
    });

    // Trả về kết quả dưới dạng JSON
    res.status(200).json(unpaidOrders);
  } catch (err) {
    // Xử lý lỗi và chuyển đến middleware lỗi tiếp theo
    next(err);
  }
});


// Đã xử lý/ chưa xử lý đơn của Bếp

router.get("/chef-handled", async (req, res, next) => {
    try {
      // Tìm các đơn hàng đã được giao
      const deliveredOrders = await model.OrderCake.findAll({
        where: {
          handleStatus: 'Đã xử lý' // Hoặc giá trị tương ứng với trạng thái đã giao
        },
        include: [
          {
            model: model.OrderCakeDetail,
            as: 'OrderCakeDetail'
          },
          {
            model: model.Payment,
            as: 'Payment'
          }
        ]
      });
  
      // Trả về kết quả dưới dạng JSON
      res.status(200).json(deliveredOrders);
    } catch (err) {
      // Xử lý lỗi và chuyển đến middleware lỗi tiếp theo
      next(err);
    }
  });

  router.get("/chef-not-handled", async (req, res, next) => {
    try {
      // Tìm các đơn hàng đã được giao
      const deliveredOrders = await model.OrderCake.findAll({
        where: {
          handleStatus: 'Chưa xử lý' // Hoặc giá trị tương ứng với trạng thái đã giao
        },
        include: [
          {
            model: model.OrderCakeDetail,
            as: 'OrderCakeDetail'
          },
          {
            model: model.Payment,
            as: 'Payment'
          }
        ]
      });
  
      // Trả về kết quả dưới dạng JSON
      res.status(200).json(deliveredOrders);
    } catch (err) {
      // Xử lý lỗi và chuyển đến middleware lỗi tiếp theo
      next(err);
    }
  });
  router.put("/admin-update-status/:orderCakeID", async (req, res, next) => {
    const { orderCakeID } = req.params;
    
    try {
      // Tìm đơn hàng theo ID và cập nhật tình trạng
      const updatedOrder = await model.OrderCake.update(
        { deliveryStatus: "Đã vận chuyển" }, // Cập nhật tình trạng
        { 
          where: { orderCakeID },
          returning: true, // Để lấy thông tin đã cập nhật
          plain: true // Để nhận đối tượng đơn hàng đã cập nhật
        }
      );
  
      if (updatedOrder[0] === 0) {
        // Không tìm thấy đơn hàng nào để cập nhật
        return res.status(404).json({ message: "Đơn hàng không tìm thấy" });
      }
  
      // Trả về đơn hàng đã được cập nhật
      res.status(200).json(updatedOrder[1]);
    } catch (err) {
      next(err);
    }
  });
  router.put("/update-receive-status/:orderCakeID", async (req, res, next) => {
    const { orderCakeID } = req.params;
  
    try {
      // Tìm đơn hàng theo ID và cập nhật tình trạng nhận hàng
      const [updatedCount, [updatedOrder]] = await model.OrderCake.update(
        { receiveStatus: "Đã nhận hàng" }, // Cập nhật tình trạng nhận hàng
        {
          where: { orderCakeID },
          returning: true, // Để lấy thông tin đã cập nhật
          plain: true // Để nhận đối tượng đơn hàng đã cập nhật
        }
      );
  
      if (updatedCount === 0) {
        // Không tìm thấy đơn hàng nào để cập nhật
        return res.status(404).json({ message: "Đơn hàng không tìm thấy" });
      }
  
      // Trả về đơn hàng đã được cập nhật
      res.status(200).json(updatedOrder);
    } catch (err) {
      next(err);
    }
  });
  
  

module.exports = router;
