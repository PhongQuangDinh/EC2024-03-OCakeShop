const express = require('express');
const router = express.Router();
const model = require('../models');

// Route để lấy tất cả nguyên liệu
router.get('/', async (req, res, next) => {
  try {
    const ingredients = await model.Ingredient.findAll();
    res.status(200).json(ingredients);
  } catch (err) {
    next(err);
  }
});

// Route để thêm nguyên liệu mới
router.post('/add-ingredient', async (req, res, next) => {
  try {
    // Lấy dữ liệu nguyên liệu từ body của yêu cầu
    const ingredientData = req.body;

    // Tạo nguyên liệu mới sử dụng phương thức model
    const newIngredient = await model.Ingredient.createIngredient(ingredientData);

    // Gửi phản hồi với nguyên liệu mới được tạo
    res.status(201).json(newIngredient);
  } catch (err) {
    // Chuyển lỗi cho middleware xử lý lỗi toàn cục
    next(err);
  }
});

// Route để thay đổi số lượng của nguyên liệu
router.put('/update-quantity/:ingredientID', async (req, res, next) => {
  try {
    const { ingredientID } = req.params;
    const { quantity } = req.body;

    // Tìm nguyên liệu dựa trên ingredientID
    const ingredient = await model.Ingredient.findByPk(ingredientID);

    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    // Cập nhật số lượng nguyên liệu
    ingredient.quantity = quantity;
    await ingredient.save();

    // Gửi phản hồi với nguyên liệu đã được cập nhật
    res.status(200).json(ingredient);
  } catch (err) {
    // Chuyển lỗi cho middleware xử lý lỗi toàn cục
    next(err);
  }
});

module.exports = router;
