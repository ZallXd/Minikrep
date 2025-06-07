const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let botStatus = "Bot belum online";

function createBot() {
  const bot = mineflayer.createBot({
    host: "Zall001.aternos.me", // ganti IP Aternos kamu
    port: 25565,
    username: "Sayangku",
    version: false
  });

  bot.on('spawn', () => {
    console.log("Bot berhasil masuk ke server!");
    botStatus = "Bot online";

    setInterval(() => {
      bot.setControlState('forward', true);
      setTimeout(() => bot.setControlState('forward', false), 1000);
    }, 15000);

    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log("Bot terputus, mencoba reconnect...");
    botStatus = "Bot offline, mencoba reconnect...";
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log("Error:", err);
    botStatus = "Terjadi error: " + err.message;
  });
}

createBot();

// Web server agar Render tetap hidup
app.get("/", (req, res) => {
  res.send(`<h1>${botStatus}</h1>`);
});

app.listen(port, () => {
  console.log(`Website aktif di http://localhost:${port}`);
});
