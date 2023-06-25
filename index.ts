import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { parseCommand } from './utils/parseCommand';

dotenv.config();

const token = process.env.TELEGRAM_TOKEN;
const deadPoetsChatId = process.env.DEAD_POETS_CHAT_ID;
const myId = process.env.MY_ID;

if (!token) {
  throw new Error('Bot token is not defined!');
}

if (!deadPoetsChatId) {
  throw new Error('Dead poets chat id is not defined!');
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(parseCommand('echo'), (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match?.[1];

  bot.sendMessage(chatId, resp || 'Пустое сообщение :(');
});

bot.onText(parseCommand('send'), async (msg, match) => {
  const resp = match?.[1];

  if (resp) {
    await bot.sendMessage(deadPoetsChatId, resp);
    bot.sendMessage(msg.chat.id, 'Текст отправлен!');

    if (myId) {
      bot.sendMessage(
        myId,
        JSON.stringify(
          {
            message_id: msg.message_id,
            text: msg.text,
          },
          null,
          2
        ) || 'Пустое сообщение :('
      );
    }
  } else {
    bot.sendMessage(
      msg.chat.id,
      `Нечего отправить :(  
Попробуй /send твой текст`
    );
  }
});

bot.onText(/\/help/, (msg, match) => {
  const chatId = msg.chat.id;

  const resp = `
    Привет, ${msg.from?.first_name}! Ты можешь:

/send текст - отправить сообщение в чатик киберпоэтов
  `;

  bot.sendMessage(chatId, resp);
});
