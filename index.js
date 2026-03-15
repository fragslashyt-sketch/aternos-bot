const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Pro-Stealth Bot is Active!'));
app.listen(port, () => console.log(`Live on ${port}`));

const mineflayer = require('mineflayer');

const botArgs = {
  host: 'fragslashsmp.aternos.me', 
  port: 24897,                      
  username: 'Trainingacat', // <--- Use a normal name
  version: '1.21.11'
};

const initBot = () => {
  const bot = mineflayer.createBot(botArgs);

  bot.on('spawn', () => {
    console.log('Bot spawned! Starting real player movements...');
    
    // Every 20-40 seconds, do a "Real Player" action
    setInterval(() => {
      const chance = Math.random();

      if (chance < 0.4) {
        // 1. Walk in a random direction for 2 seconds
        const yaw = Math.random() * Math.PI * 2;
        bot.look(yaw, 0);
        bot.setControlState('forward', true);
        setTimeout(() => bot.setControlState('forward', false), 2000);
        console.log('Walking...');

      } else if (chance < 0.7) {
        // 2. Look around and "punch" (break) the block in front
        const block = bot.blockAtCursor(4);
        bot.swingArm('right');
        if (block) {
          bot.dig(block, true).catch(() => {});
          console.log('Breaking block...');
        }

      } else {
        // 3. Just jump and look up at the sky
        bot.setControlState('jump', true);
        bot.look(bot.entity.yaw, 0.5);
        setTimeout(() => bot.setControlState('jump', false), 500);
        console.log('Jumping!');
      }

    }, Math.floor(Math.random() * 20000) + 20000);
  });

  bot.on('end', () => {
    console.log('Disconnected. Waiting 1 min...');
    setTimeout(initBot, 60000);
  });

  bot.on('error', (err) => console.log('Error:', err));
};

initBot();
