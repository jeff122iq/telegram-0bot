const express = require("express")
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const PORT = process.env.PORT
const ip = process.env.IP || 'localhost'
console.log(PORT)
const {Telegraf} = require('telegraf')
const badPhrases = require("./badPhrases");


app.listen(PORT || 5000, () => {
  console.log(`Server start at http://${ip}:${PORT}`)
})


const index = new Telegraf("1794353601:AAFFNql3Mxf5RSPkm_uan8ejtnY6jPMmoyE")
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

index.on('sticker', (ctx) => ctx.reply('HUI'))
index.on("text", (ctx) => {

  if ( onCheckBadPhrase(ctx).length === 1) {
    ctx.reply('Братан, будь вежлив, не выражайся!')
  } else if (onCheckBadPhrase(ctx).length >= 2) {
    ctx.reply('Ты ох*ел чертило??? ПШЕЛ НАХ*Й ОТСЮДА!!!')
  }
})
index.launch()