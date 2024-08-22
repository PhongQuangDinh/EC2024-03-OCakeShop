const express = require("express");
const router = express.Router();
const model = require('../models');
const { Op } = require('sequelize');

// Lấy đơn đặt hàng
router.get("/", async (req, res, next) => {
  try {
    const order = await model.OrderCake.findAll();

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});

// thông tin đã/chưa giao hàng của admin
router.get("/admin-delivered", async (req, res, next) => {
    try {
      // Tìm các đơn hàng đã được giao
      const deliveredOrders = await model.OrderCake.findAll({
        where: {
          deliveryStatus: 'Đã vận chuyển' // Hoặc giá trị tương ứng với trạng thái đã giao
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

  router.get("/admin-not-delivered", async (req, res, next) => {
    try {
      // Tìm các đơn hàng đã được giao
      const deliveredOrders = await model.OrderCake.findAll({
        where: {
          deliveryStatus: 'Chưa vận chuyển' // Hoặc giá trị tương ứng với trạng thái đã giao
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


module.exports = router;
