const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "confused",
    version: "1.0",
    author: "MR.AYAN",
    countDown: 1,
    role: 0,
    shortDescription: "ConfusedStonk Image!",
    longDescription: "",
    category: "fun",
    guide: "{pn} [mention|leave_blank]",
    envConfig: {
      deltaNext: 5
    }
  },

  langs: {
    vi: {
      noTag: "Bạn phải tag người bạn muốn tát"
    },
    en: {
      noTag: "𝗬𝗼𝘂 𝗠𝘂𝘀𝘁 𝗧𝗮𝗴 𝗧𝗵𝗲 𝗣𝗲𝗿𝘀𝗼𝗻 𝗬𝗼𝘂 𝗪𝗮𝗻𝘁 𝗧𝗼 𝗖𝗼𝗻𝗳𝘂𝘀𝗲𝗱 "
    }
  },

  onStart: async function ({ event, message, usersData, args, getLang }) {
    let mention = Object.keys(event.mentions)
    let uid;

    if (event.type == "message_reply") {
      uid = event.messageReply.senderID
    } else {
      if (mention[0]) {
        uid = mention[0]
      } else {
        console.log(" jsjsj")
        uid = event.senderID
      }
    }

    let url = await usersData.getAvatarUrl(uid)
    let avt = await new DIG.ConfusedStonk().getImage(url)

    const pathSave = `${__dirname}/tmp/ConfusedStonk.png`;
    fs.writeFileSync(pathSave, Buffer.from(avt));
    // Send the image as a reply to the command message
    message.reply({
      attachment: fs.createReadStream(pathSave)
    }, () => fs.unlinkSync(pathSave));
  }
};
