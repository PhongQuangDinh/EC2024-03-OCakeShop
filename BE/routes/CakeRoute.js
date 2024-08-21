const express = require("express");
const router = express.Router();
const model = require('../models');

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

router.get("/purpose",  async (req, res, next) =>{
  try{
    const purpose = await model.Purpose.findAll({
      where: {
        purposeID_ref: null
      }
    });

    if(!purpose){
      return res.status(404).json({message: "No purpose found"});
    }
    return res.status(200).json(purpose);
  }
  catch (err) {
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

router.get("/:id", async (req, res, next) => {
    try {
        const cake = await model.Cake.findByPk(req.params.id, {
            include:
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
                }
        });
            
        res.status(200).json(cake.cakeImages);
        // );
    }
    catch (err) { next(err); }
});

// thêm loại bánh mới (admin)
// Route để thêm loại bánh mới
router.post('/', async (req, res, next) => {
  try {
    const cakeData = req.body;

    // Tạo loại bánh mới sử dụng phương thức model
    const newCake = await model.Cake.createCake(cakeData);
    res.status(201).json(newCake);
  } catch (err) {
    // Chuyển lỗi cho middleware xử lý lỗi toàn cục
    next(err);
  }
});


module.exports = router;
