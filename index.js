const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: "Zall001.aternos.me", // ganti dengan IP server Aternos kamu
    port: 25565,
    username: "Sayangku", // bebas
    version: false // biar otomatis deteksi versi
  });

  bot.on('spawn', () => {
    console.log("Bot berhasil masuk ke server!");

    // Gerak terus agar tidak AFK
    setInterval(() => {
      bot.setControlState('forward', true);
      setTimeout(() => bot.setControlState('forward', false), 1000);
    }, 15000); // setiap 15 detik

    // Loncat sesekali
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000); // setiap 30 detik
  });

  bot.on('end', () => {
    console.log("Bot disconnected, mencoba reconnect...");
    setTimeout(createBot, 5000); // auto reconnect
  });
}

createBot();
