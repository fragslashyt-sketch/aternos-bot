const express = require('express');
const app = express();
const port = process.env.PORT || 10000; 

app.get('/', (req, res) => res.send('Bot is trying to connect...'));
app.listen(port, '0.0.0.0', () => console.log(`Web server on port ${port}`));

const mineflayer = require('mineflayer');

const botArgs = {
  host: 'mantaray.aternos.host', // Using the Dyn IP from your screenshot
  port: 24897,                      
  username: 'TrainingACat', 
  version: '1.21.1' 
};

const initBot = () => {
  console.log('--- Attempting Connection via Dyn IP ---');
  const bot = mineflayer.createBot(botArgs);

  bot.on('spawn', () => {
    console.log('SUCCESS: BOT IS IN THE GAME!');
    // Hyper-active movement loop
    setInterval(() => {
      bot.look(Math.random() * Math.PI * 2, (Math.random() - 0.5));
      bot.setControlState('forward', true);
      setTimeout(() => bot.setControlState('forward', false), 700);
      bot.swingArm('right');
      if (Math.random() > 0.5) bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 400);
    }, 1500);
  });

  bot.on('error', (err) => {
    console.log('Connection Failed:', err.message);
  });

  bot.on('end', () => {
    console.log('Disconnected. Retrying in 30 seconds...');
    setTimeout(initBot, 30000);
  });
};

initBot();
