const express = require("express");
const router = express.Router();
const model = require("../models");
const { Op } = require("sequelize");
const { authenticateToken } = require("../routes/authenticationRoute");
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
          where: {
            pickUpTime: {
              [Op.gte]: new Date(),
            },
          },
        },
        {
          model: model.Cart,
          as: "OrderCart",
          required: true,
          where: { status: "Đã mua" },
          include: [
            {
              model: model.Cake,
              required: true,
              include: [
                {
                  model: model.CakeSize,
                  as: "cakeSize",
                  required: true,
                },
                {
                  model: model.CakeFilling,
                  as: "cakeFilling",
                  required: true,
                },
              ],
            },
          ],
        },
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
    for (const orderCakeDetail of orderCakeDetails) {
      const { orderCakeDetailID, arrange } = orderCakeDetail;

      try {
        const [updateRows] = await model.OrderCakeDetail.update(
          {
            handleStatus: "Đã xử lý",
            arrange: arrange,
          },
          {
            where: { orderCakeDetailID: orderCakeDetailID },
          }
        );
        if (updateRows === 0) {
          return res.status(400).json({ message: "OrderCakeDetail not found" });
        }
        const updatedOrderCakeDetail = await model.OrderCakeDetail.findOne({
          where: { orderCakeDetailID: orderCakeDetailID },
        });
        res.status(200).json(updatedOrderCakeDetail);
      } catch (err) {
        console.error(
          `Failed to update OrderCakeDetailID ${orderCakeDetailID}:`,
          err
        );
      }
    }

    // const order = await fetch(`http://localhost:8080/ordercake/manage`)

    res.status(200).json({ Message: "Success" });
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

    // Định dạng dữ liệu để trả về
    const formattedOrders = deliveredOrders.map(order => {
      return {
        orderCakeID: order.orderCakeID,
        customerName: order.OrderDetails[0]?.OrderCart?.customer?.name || 'N/A',
        customerPhone: order.OrderDetails[0]?.OrderCart?.customer?.phoneNumber || 'N/A',
        pickUpTime: order.OrderDetails[0]?.OrderCart?.pickUpTime,
        receiveStatus: order.receiveStatus,
        orderDetails: order.OrderDetails,
        payment: order.Payment
      };
    });

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

    // Định dạng dữ liệu để trả về
    const formattedOrders = notDeliveredOrders.map(order => {
      return {
        orderCakeID: order.orderCakeID,
        customerName: order.OrderDetails[0]?.OrderCart?.customer?.name || 'N/A',
        customerPhone: order.OrderDetails[0]?.OrderCart?.customer?.phoneNumber || 'N/A',
        pickUpTime: order.OrderDetails[0]?.OrderCart?.pickUpTime,
        receiveStatus: order.receiveStatus,
        orderDetails: order.OrderDetails,
        payment: order.Payment
      };
    });

    // Trả về kết quả dưới dạng JSON
    res.status(200).json(formattedOrders);
  } catch (err) {
    // Xử lý lỗi và chuyển đến middleware lỗi tiếp theo
    next(err);
  }
});

  

  router.get("/cus-received", authenticateToken, async (req, res, next) => {
    try {
      const userID = req.user.userID;
      const deliveredOrders = await model.OrderCake.findAll({
        where: {
          receiveStatus: 'Đã nhận hàng' // Hoặc giá trị tương ứng với trạng thái đã giao
        },
        include: [
          {
            model: model.OrderCakeDetail,
            as: 'OrderDetails',
            required: true,
            include: [{
              model: model.Cart,
              as: "OrderCart",
              required: true,
              include: [{
                model: model.Customer,
                as: "customer",
                required: true,
                where: {userID}
              },
              {
                model: model.CakeSize,
                as: "cakeSize",
                required: true
              },
              {
                model: model.CakeFilling,
                as: "cakeFilling",
                required: true
              }
            ]
            }]
          },
          {
            model: model.Payment,
            as: 'Payment'
          }
        ]
      });
  
      res.status(200).json(deliveredOrders);
    } catch (err) {
      next(err);
    }
  });

  router.post("/buying", authenticateToken, async (req, res, next) => {
    try {
      const orderCakeDetails = req.body;
      console.log(orderCakeDetails);
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
  

  router.get("/cus-not-received", authenticateToken ,async (req, res, next) => {
    try {
      const userID = req.user.userID;
      const deliveredOrders = await model.OrderCake.findAll({
        where: {
          receiveStatus: 'Chưa nhận hàng' // Hoặc giá trị tương ứng với trạng thái đã giao
        },
        include: [
          {
            model: model.OrderCakeDetail,
            as: 'OrderDetails',
            required: true,
            include: [{
              model: model.Cart,
              as: "OrderCart",
              required: true,
              include: [{
                model: model.Customer,
                as: "customer",
                required: true,
                where: {userID}
              },
              {
                model: model.CakeSize,
                as: "cakeSize",
                required: true
              },
              {
                model: model.CakeFilling,
                as: "cakeFilling",
                required: true
              }
            ]
            }]
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
        "$Payment.paymentID$": {
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
        handleStatus: "Đã xử lý", // Hoặc giá trị tương ứng với trạng thái đã giao
      },
      include: [
        {
          model: model.OrderCakeDetail,
          as: "OrderCakeDetail",
        },
        {
          model: model.Payment,
          as: "Payment",
        },
      ],
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
        handleStatus: "Chưa xử lý", // Hoặc giá trị tương ứng với trạng thái đã giao
      },
      include: [
        {
          model: model.OrderCakeDetail,
          as: "OrderCakeDetail",
        },
        {
          model: model.Payment,
          as: "Payment",
        },
      ],
    });

    // Trả về kết quả dưới dạng JSON
    res.status(200).json(deliveredOrders);
  } catch (err) {
    // Xử lý lỗi và chuyển đến middleware lỗi tiếp theo
    next(err);
  }
});

module.exports = router;
