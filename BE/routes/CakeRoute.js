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

// router.get("/purpose/all", async (req, res, next) => {
//   try {
//     const purpose = await model.Purpose.findAll({
//       where: {
//         purposeID_ref: {
//           [Op.is]: null // This should translate to IS NULL in SQL
//         }
//       }
//     });

//     if (!purpose || purpose.length === 0) {
//       return res.status(404).json({ message: "No purpose found" });
//     }
//     return res.status(200).json(purpose);
//   } catch (err) {
//     next(err);
//   }
// });

router.get("/purpose/all", async (req, res, next) => {
  try {
    // Lấy tất cả các purpose gốc (purposeID_ref = null)
    const purposes = await model.Purpose.findAll({
      where: {
        purposeID_ref: {
          [Op.is]: null
        }
      },
      include: [{
        model: model.Purpose,
        as: 'children', // Bao gồm các con
        include: [{
          model: model.Purpose,
          as: 'children' // Đệ quy để lấy các con của con nếu có
        }]
      }]
    });

    if (!purposes || purposes.length === 0) {
      return res.status(404).json({ message: "No purpose found" });
    }

    return res.status(200).json(purposes);
  } catch (err) {
    next(err);
  }
});

// router.get("/purpose/all", async (req, res, next) => {
//   try {
//         // Lấy tất cả các purpose gốc (purposeID_ref = null)
//         const purposes = await model.Purpose.findAll({
//           where: {
//             purposeID_ref: {
//               [Op.is]: null
//             }
//           },
//           include: [{
//             model: model.Purpose,
//             as: 'children', // Bao gồm các con
//             include: [{
//               model: model.Purpose,
//               as: 'children' // Đệ quy để lấy các con của con nếu có
//             }]
//           }]
//         });
    

//     // Hàm để "phẳng" danh sách các mục đích
//     const flattenPurposes = (purposes, result = []) => {
//       purposes.forEach(purpose => {
//         // Push từng mục đích vào danh sách kết quả
//         result.push({
//           purposeID: purpose.purposeID,
//           title: purpose.title,
//           purposeID_ref: purpose.purposeID_ref
//         });
        
//         // Nếu có con, đệ quy để thêm con vào danh sách
//         if (purpose.children && purpose.children.length > 0) {
//           flattenPurposes(purpose.children, result);
//         }
//       });
//       return result;
//     };

//     // Phẳng danh sách
//     const flatResult = flattenPurposes(purposes);

//     if (!flatResult || flatResult.length === 0) {
//       return res.status(404).json({ message: "No purpose found" });
//     }

//     return res.status(200).json(flatResult);
//   } catch (err) {
//     next(err);
//   }
// });

// router.get("/purpose/:purposeID", async (req, res, next) => {
//   try {
//       const purposeID = req.params.purposeID;
//       const cake = await model.Cake.findAll({
//         include:
//         [
//           {
//               model: model.CakeImage,
//               as: "cakeImages",
//               required: true,
//               include: 
//               {
//                 model: model.ImageDetail,
//                 as: "imageDetail",
//                 required: true,
//               }
//           },
//           {
//             model: model.Purpose,
//             as: "purpose",
//             required: true,
//             where: {
//               purposeID: purposeID
//             }
//           }
//         ]
//       });
          
//       res.status(200).json(cake);
//       // );
//   }
//   catch (err) { next(err); }
// });
router.get("/purpose/:purposeID", async (req, res, next) => {
  try {
    const purposeID = req.params.purposeID;

    // Lấy mục đích hiện tại
    const purpose = await model.Purpose.findByPk(purposeID);

    if (!purpose) {
      return res.status(404).json({ message: "Purpose not found" });
    }

    // Lấy tất cả các purpose con (nếu có)
    const purposes = await model.Purpose.findAll({
      where: {
        [Op.or]: [
          { purposeID: purposeID },
          { purposeID_ref: purposeID }
        ]
      }
    });

    const purposeIDs = purposes.map(p => p.purposeID);

    // Tìm tất cả các Cake có liên quan đến các purpose này
    const cakes = await model.Cake.findAll({
      include: [
        {
          model: model.CakeImage,
          as: "cakeImages",
          required: true,
          include: {
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
            purposeID: purposeIDs
          }
        }
      ]
    });

    res.status(200).json(cakes);
  } catch (err) {
    next(err);
  }
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
