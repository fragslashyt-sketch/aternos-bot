const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Active Pro-Bot is Live!'));
app.listen(port, () => console.log(`Live on ${port}`));

const mineflayer = require('mineflayer');

const botArgs = {
  host: 'fragslashsmp.aternos.me', 
  port: 24897,                      
  username: 'TrainingACat', 
  version: '1.21.11'
};

const initBot = () => {
  const bot = mineflayer.createBot(botArgs);

  bot.on('spawn', () => {
    console.log('Bot spawned! Hyper-active mode engaged.');
    
    // ACTION LOOP: Runs every 1.5 seconds
    setInterval(() => {
      const r = Math.random();

      if (r < 0.25) {
        // 1. Move & Look
        const yaw = Math.random() * Math.PI * 2;
        bot.look(yaw, (Math.random() - 0.5));
        bot.setControlState('forward', true);
        setTimeout(() => bot.setControlState('forward', false), 800);
      } 
      else if (r < 0.50) {
        // 2. Jump & Swing
        bot.setControlState('jump', true);
        bot.swingArm('right');
        setTimeout(() => bot.setControlState('jump', false), 400);
      } 
      else if (r < 0.75) {
        // 3. Dig/Punch at cursor
        const block = bot.blockAtCursor(4);
        if (block && block.name !== 'air') {
          bot.dig(block, true).catch(() => {});
        } else {
          bot.swingArm('right');
        }
      } 
      else {
        // 4. Sneak & Chat
        bot.setControlState('sneak', true);
        setTimeout(() => bot.setControlState('sneak', false), 1000);
        // 30% chance to say something random
        if (Math.random() < 0.05) {
          const msgs = ['lag?', 'lol', 'nice', 'gg'];
          bot.chat(msgs[Math.floor(Math.random() * msgs.length)]);
        }
      }
    }, 1500); 
  });

  bot.on('end', () => setTimeout(initBot, 60000));
  bot.on('error', (err) => console.log(err));
};

initBot();
