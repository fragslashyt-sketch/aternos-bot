const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot is Waiting...'));
app.listen(process.env.PORT || 3000);

const mineflayer = require('mineflayer');

const botArgs = {
  host: 'fragslashsmp.aternos.me', 
  port: 24897,                      
  username: 'TrainingACat', 
  version: '1.21.1'
};

const initBot = () => {
  console.log('--- Attempting to Join Aternos ---');
  const bot = mineflayer.createBot(botArgs);

  bot.on('spawn', () => {
    console.log('SUCCESS: Bot is now in the server!');
    // Random movements to stay active
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
      bot.swingArm('right');
    }, 30000);
  });

  bot.on('error', (err) => {
    console.log('Connection Error:', err.message);
  });

  bot.on('end', () => {
    console.log('Disconnected. Retrying in 60s...');
    setTimeout(initBot, 60000);
  });
};

initBot();
