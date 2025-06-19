const axios = require("axios");

module.exports = {
  config: {
    name: "bot",
    aliases: [],
    version: "1.0",
    author: "sasuke roy",
    countDown: 3,
    role: 0,
    shortDescription: "AI bot reply",
    longDescription: "Just say 'bot' to get a reply, or talk with AI using /bot",
    category: "fun",
    guide: {
      en: "{pn} <message> — Talk to the AI bot"
    }
  },

  onStart: async function () {
    // Nothing to do on start
  },

  // যদি কেউ শুধু 'bot' বলে
  onChat: async function ({ event, message }) {
    const content = event.body?.toLowerCase();
    if (content === "bot") {
      return message.reply("হ্যাঁ বলো, আমি আছি 🤖");
    }
  },

  // যদি কেউ /bot দিয়ে কথা বলে
  onMessage: async function ({ event, message, args }) {
    const prompt = args.join(" ");
    if (!prompt) return message.reply("কি বলবে আমাকে?");

    try {
      const res = await axios.get(`https://api.affiliateplus.xyz/api/chatbot`, {
        params: {
          message: prompt,
          botname: "OpuBot",
          ownername: "sasuke",
          user: event.senderID
        }
      });

      return message.reply(res.data.message);
    } catch (err) {
      console.error(err);
      return message.reply("দুঃখিত, আমি এখন উত্তর দিতে পারছি না 😢");
    }
  }
};
