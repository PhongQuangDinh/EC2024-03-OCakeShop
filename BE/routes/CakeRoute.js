const express = require("express");
const router = express.Router();
const model = require('../models');
const { Op } = require("sequelize");
const {authenticateToken} = require('../routes/authenticationRoute');

router.get("/", async (req, res, next) => {
  try {
    const cakes = await model.Cake.findAll({
      include: {
        model:  model.CakeImage,
        as: "cakeImages",
        required: true,
        where: {isPoster : 1},
        include: 
        {
          model: model.ImageDetail,
          as: "imageDetail",
          required: true,
        }
      }
    });

    res.status(200).json(cakes);
  } catch (err) {
    next(err);
  }
});

router.get("/size", async (req, res, next) => {
  try {
    const sizes = await model.CakeSize.findAll();

    if(!sizes){
      res.status(404).json({"message": "Load size error"})
    }

    res.status(200).json(sizes);
  } catch (err) {
    next(err);
  }
});

router.get("/filling", async (req, res, next) => {
  try {
    const fillings = await model.CakeFilling.findAll();

    if(!fillings){
      res.status(404).json({"message": "Load size error"})
    }

    res.status(200).json(fillings);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const cakes = await model.Cake.findByPk(req.params.id, {
      include: {
        model:  model.CakeImage,
        as: "cakeImages",
        required: true,
        where: {isPoster: "1"},
        include: 
        {
          model: model.ImageDetail,
          as: "imageDetail",
          required: true,
        }
      }
    });

    res.status(200).json(cakes);
  } catch (err) {
    next(err);
  }
});

router.get("/purpose/all", async (req, res, next) => {
  try {
    const purpose = await model.Purpose.findAll({
      where: {
        purposeID_ref: {
          [Op.is]: null // This should translate to IS NULL in SQL
        }
      }
    });

    if (!purpose || purpose.length === 0) {
      return res.status(404).json({ message: "No purpose found" });
    }
    return res.status(200).json(purpose);
  } catch (err) {
    next(err);
  }
});

router.get("/purpose/:purposeID", async (req, res, next) => {
  try {
      const purposeID = req.params.purposeID;
      const cake = await model.Cake.findAll({
        include:
        [
          {
              model: model.CakeImage,
              as: "cakeImages",
              required: true,
              include: 
              {
                model: model.ImageDetail,
                as: "imageDetail",
                required: true,
              }
          },
          {
            model: model.Purpose,
            as: "purpose",
            required: true,
            where: {
              purposeID: purposeID
            }
          }
        ]
      });
          
      res.status(200).json(cake);
      // );
  }
  catch (err) { next(err); }
});

// lấy kích thước bánh
router.get('/cake-sizes', async (req, res) => {
  try {
    const cakeSizes = await model.CakeSize.findAll();

    res.json(cakeSizes);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving cake sizes: ${error.message}` });
  }
});

// router.get("/:id", async (req, res, next) => {
//     try {
//         const cake = await model.Cake.findByPk(req.params.id, {
//             include:
//                 {
//                     model: model.CakeImage,
//                     as: "cakeImages",
//                     required: true,
//                     include: 
//                     {
//                       model: model.ImageDetail,
//                       as: "imageDetail",
//                       required: true,
//                     }
//                 }
//         });
            
//         res.status(200).json(cake.cakeImages);
//         // );
//     }
//     catch (err) { next(err); }
// });

router.post('/add-cake', async (req, res, next) => {
  try {
    const cakeData = req.body;

    const newCake = await model.Cake.createCake(cakeData);
    res.status(201).json(newCake);
  } catch (err) {
    // Chuyển lỗi cho middleware xử lý lỗi toàn cục
    next(err);
  }
});

module.exports = router;
