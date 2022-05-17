const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

const createPdfFromImage = async (imageBinary) => {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create();
  // Add a blank page to the document
  const page = pdfDoc.addPage();

  const jpgImage = await pdfDoc.embedJpg(imageBinary);

  //   // Draw the JPG image in the center of the page
  page.drawImage(jpgImage, {
    x: 0,
    y: 0,
    width: page.getWidth(),
    height: page.getHeight(),
  });

  pdfDoc.setTitle("Yıldönümü");
  pdfDoc.setAuthor("BMC");
  pdfDoc.setSubject("Nice başarılı yıllara");
  pdfDoc.setKeywords(["anniversary", "celebration", "BMC"]);
  pdfDoc.setProducer("BMC");
  pdfDoc.setCreator("BMC Special Day App");
  pdfDoc.setCreationDate(new Date());
  pdfDoc.setModificationDate(new Date());

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  //   fs.writeFile(
  //     path.join(__dirname, "../assets/pdf/out.pdf"),
  //     Buffer.from(pdfBytes),
  //     (e) => {
  //       console.log(e);
  //       //console.log("File is written");
  //     }
  //   );

  return pdfBytes;
};

module.exports = createPdfFromImage;
