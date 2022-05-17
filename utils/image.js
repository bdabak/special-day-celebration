const Jimp = require("jimp");

async function processAnniversaryImage(sName, sSenio, sFooter, bWrite, format) {
  try {
    const imgOriginal = "./assets/img/raw/anniversary_raw.jpg";
    const imgProcessed = "./assets/img/export/anniversary_modified.jpg";

    let img = await Jimp.read(imgOriginal);
    let fontHeader = await Jimp.loadFont("./assets/fonts/header/Itim_64.fnt");
    let fontBody = await Jimp.loadFont(
      "./assets/fonts/body/Rajdhani_Light_30.fnt"
    );
    let fontFooter = await Jimp.loadFont(
      "./assets/fonts/footer/Barlow_Condensed_11.fnt"
    );

    const bodyOffset = 40;
    let offsetY = 390;

    const calcBodyOffset = (e = 0) => {
      offsetY = offsetY + bodyOffset + e;

      return offsetY;
    };

    let finalImage = await img
      .print(
        fontHeader,
        64,
        325,
        {
          text: `Sevgili ${sName},`,
          alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: Jimp.VERTICAL_ALIGN_TOP,
        },
        560
      )
      .print(
        fontBody,
        67,
        calcBodyOffset(),
        {
          text: "Bugün aramıza",
          alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: Jimp.VERTICAL_ALIGN_TOP,
        },
        500
      )
      .print(
        fontBody,
        67,
        calcBodyOffset(),
        {
          text: `katılışının ${sSenio}. yıl dönümü.`,
          alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: Jimp.VERTICAL_ALIGN_TOP,
        },
        500
      )
      .print(
        fontBody,
        67,
        calcBodyOffset(),
        {
          text: "İşte bu yüzden sadece",
          alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: Jimp.VERTICAL_ALIGN_TOP,
        },
        500
      )
      .print(
        fontBody,
        67,
        calcBodyOffset(),
        {
          text: "senin için değil, bizim",
          alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: Jimp.VERTICAL_ALIGN_TOP,
        },
        500
      )
      .print(
        fontBody,
        67,
        calcBodyOffset(),
        {
          text: "için de çok özel bir gün.",
          alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: Jimp.VERTICAL_ALIGN_TOP,
        },
        500
      )
      .print(
        fontBody,
        67,
        calcBodyOffset(),
        {
          text: "İyi ki varsın, iyi ki",
          alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: Jimp.VERTICAL_ALIGN_TOP,
        },
        500
      )
      .print(
        fontBody,
        67,
        calcBodyOffset(),
        {
          text: "aramızdasın!",
          alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: Jimp.VERTICAL_ALIGN_TOP,
        },
        500
      )
      .print(
        fontBody,
        67,
        calcBodyOffset(40),
        {
          text: "Birlikte daha nice",
          alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: Jimp.VERTICAL_ALIGN_TOP,
        },
        500
      )
      .print(
        fontBody,
        67,
        calcBodyOffset(),
        {
          text: "güzel işlere imza",
          alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: Jimp.VERTICAL_ALIGN_TOP,
        },
        500
      )
      .print(
        fontBody,
        67,
        calcBodyOffset(),
        {
          text: "atmak dileğiyle...",
          alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: Jimp.VERTICAL_ALIGN_TOP,
        },
        500
      )
      .print(
        fontFooter,
        67,
        1153,
        {
          text: sFooter,
          alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: Jimp.VERTICAL_ALIGN_TOP,
        },
        500
      );

    if (bWrite) {
      finalImage.write(imgProcessed);
    }

    switch (format) {
      case "base64":
        return await finalImage.getBase64Async(Jimp.MIME_JPEG);
      default:
        return await finalImage.getBufferAsync(Jimp.MIME_JPEG);
    }
  } catch (e) {
    console.error(e);
  }
}

async function getImage(imageOptions) {
  const {
    type,
    name,
    seniority,
    footer,
    writeToFile = false,
    format = "base64",
  } = imageOptions;
  switch (type) {
    case "anniversary":
      return await processAnniversaryImage(
        name,
        seniority,
        footer,
        writeToFile,
        format
      );

    default:
      throw new Error(`Image processor for "${type}" not implemented yet!`);
  }
}
// const printImage = async () => {
//   const b = await getImage({
//     type: "anniversary",
//     name: "Hüsamettin",
//     footer: "İnsan Kaynakları ve Kurumsal Gelişim Direktörlüğü",
//     seniority: "5",
//     writeToFile: true,
//     format: "binary",
//   });

//   console.log(b);
// };

// printImage();

module.exports = getImage;
