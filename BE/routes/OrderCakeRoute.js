const express = require("express");
const router = express.Router();
const model = require('../models');

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
