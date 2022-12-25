const TelegramBot = require("node-telegram-bot-api");
const request = require("request");

const token = "5590283131:AAGY0Hv3UZVnBpgDhmPZ_lxhRd3OR1MpaDQ";


const bot = new TelegramBot(token, { polling: true });

bot.on("message", function (mg) {
  request(
    "https://data.covid19india.org/state_district_wise.json",
    function (error, response, body) {
      let da = JSON.parse(body);
      let a = true;
      let l = Object.keys(da);
      let s = mg.text;
      let b = s.split(".");

      for (let i = 0; i < l.length; i++) {
        if (l[i].toLowerCase() == b[0].toLowerCase()) {
          a = false;
          bot.sendMessage(
            mg.chat.id,
            "In " +
              b[0] +
              " state " +
              b[1] +
              " district . There are \nConfirmed cases : " +
              da[b[0]]["districtData"][b[1]]["confirmed"] +
              "\nActive cases : " +
              da[b[0]]["districtData"][b[1]]["active"] +
              "\nRecovered : " +
              da[b[0]]["districtData"][b[1]]["recovered"]
          );
        }
        //  }

        // }
      }
      if (a == true) {
        bot.sendMessage(
          mg.chat.id,
          "Note : \nEnter the data in the format state_name.district_name"
        );
      }
    }
  );
});
