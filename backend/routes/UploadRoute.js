const { Router } = require("express");
const uploadMiddleware = require("../middlewares/MulterMiddleware");
const UploadModel = require("../models/UploadModel");

const router = Router();

router.get("/api/image/get", async (req, res) => {
  const allPhotos = await UploadModel.find().sort({ createdAt: "descending" });
  res.send(allPhotos);
});

router.post("/api/image/save", uploadMiddleware.single("photo"), (req, res) => {
  const photo = req.file.filename;

  console.log(req);

  UploadModel.create({ photo })
    .then((data) => {
      console.log("Uploaded Successfully...");
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
