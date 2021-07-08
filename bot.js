const {Telegraf} = require('telegraf')
const badPhrases = require("./badPhrases");

const bot = new Telegraf("1794353601:AAFFNql3Mxf5RSPkm_uan8ejtnY6jPMmoyE")
const phrase = badPhrases.BAD_PHRASES.map(item => item.toLowerCase());

function onCheckBadPhrase(ctx) {

  let checkedMessage = []
  console.log(checkedMessage);
  checkedMessage = phrase.filter((phrase) => {
    return ctx.update.message.text.includes(phrase)
  });
  console.log(checkedMessage);
  return checkedMessage;
}

bot.on('sticker', (ctx) => ctx.reply('HUI'))
bot.on("text", (ctx) => {

  if ( onCheckBadPhrase(ctx).length === 1) {
    ctx.reply('Братан, будь вежлив, не выражайся!')
  } else if (onCheckBadPhrase(ctx).length >= 2) {
    ctx.reply('Ты ох*ел чертило??? ПШЕЛ НАХ*Й ОТСЮДА!!!')
  }
})
bot.launch()