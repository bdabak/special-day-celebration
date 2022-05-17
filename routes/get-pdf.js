const express = require("express");
const Joi = require("joi");

const getImage = require("../utils/image.js");
const createPdfFromImage = require("../utils/pdf.js");

const router = express.Router();

//Only post is supported
router.post("/", async (req, res) => {
  const { e } = validateRequest(req.body);

  if (e)
    return res.status(400).json({
      pdf: null,
      error: true,
      errorMessage: e?.details[0].message,
    });

  try {
    let imageOptions = {
      ...req.body,
      writeToFile: false,
      format: "binary",
    };

    const binaryImage = await getImage(imageOptions);

    if (!binaryImage) {
      return res.status(500).json({
        pdf: null,
        error: true,
        errorMessage: "Image generation failed",
      });
    }

    const binaryPdf = await createPdfFromImage(binaryImage);

    let buff = Buffer.from(binaryPdf);
    let pdfBase64 = buff.toString("base64");

    return res
      .status(200)
      .json({ pdf: pdfBase64, error: false, errorMessage: null });
  } catch (e) {
    return res.status(500).json({
      image: null,
      error: true,
      errorMessage: e?.message,
    });
  }
});

//Not supported return 405
router.get("/", async (req, res) => {
  return res.status(405).send("GET not supported!");
});

router.get("/:id", async (req, res) => {
  return res.status(405).send("GET not supported!");
});

router.put("/:id", async (req, res) => {
  return res.status(405).send("PUT not supported!");
});

function validateRequest(request) {
  let schema = {
    type: Joi.string().required(),
    name: Joi.string().required(),
    footer: Joi.string().required(),
    seniority: Joi.string().required(),
  };

  return Joi.validate(request, schema);
}

module.exports = router;
