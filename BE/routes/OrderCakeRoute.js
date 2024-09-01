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
      include: [
        {
          model: model.OrderCake,
          as: "Order",
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
              include: 
              [
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
          ]
        }
      ],
      order: [["arrange", "ASC"]],
    });

    res.status(200).json(order);
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

    // const order = await fetch(`http://localhost:8080/ordercake/manage`)


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



  router.get("/cus-received", async (req, res, next) => {
    try {
      // Tìm các đơn hàng đã được giao
      const deliveredOrders = await model.OrderCake.findAll({
        where: {
          receiveStatus: 'Đã nhận hàng' // Hoặc giá trị tương ứng với trạng thái đã giao
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

  router.get("/cus-not-received", async (req, res, next) => {
    try {
      // Tìm các đơn hàng đã được giao
      const deliveredOrders = await model.OrderCake.findAll({
        where: {
          receiveStatus: 'Chưa nhận hàng' // Hoặc giá trị tương ứng với trạng thái đã giao
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
  

module.exports = router;
