const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Pro-Stealth Bot is Live!'));
app.listen(port, () => console.log(`Keep-alive server on port ${port}`));

const mineflayer = require('mineflayer');

const botArgs = {
  host: 'fragslashsmp.aternos.me', 
  port: 24897,                      
  username: 'TrainingACat', 
  version: '1.21.11' // Matches your Aternos screenshot
};

const initBot = () => {
  const bot = mineflayer.createBot(botArgs);

  bot.on('spawn', () => {
    console.log('Bot spawned! Starting pro movements...');
    
    // Every 20-40 seconds, pick a random "human" action
    setInterval(() => {
      const actionType = Math.random();

      if (actionType < 0.4) {
        // 1. Walk in a random direction
        const yaw = Math.random() * Math.PI * 2;
        bot.look(yaw, 0);
        bot.setControlState('forward', true);
        setTimeout(() => bot.setControlState('forward', false), 2500);
        console.log('Action: Walking around');

      } else if (actionType < 0.7) {
        // 2. Look around and "punch" air or blocks
        bot.look(Math.random() * Math.PI * 2, (Math.random() - 0.5));
        bot.swingArm('right');
        console.log('Action: Looking and swinging');

      } else {
        // 3. Jump and "sneak" (crouch)
        bot.setControlState('jump', true);
        bot.setControlState('sneak', true);
        setTimeout(() => {
          bot.setControlState('jump', false);
          bot.setControlState('sneak', false);
        }, 800);
        console.log('Action: Jump and crouch');
      }

    }, Math.floor(Math.random() * 20000) + 20000);
  });

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 60s...');
    setTimeout(initBot, 60000);
  });

  bot.on('error', (err) => console.log('Bot Error:', err));
};

initBot();
