import 'dotenv/config';
import { Bot, InlineKeyboard } from 'grammy';
import { hydrate } from '@grammyjs/hydrate';

const bot = new Bot(process.env.BOT_API_KEY);
bot.use(hydrate());

const scheduleOptions = [
    { value: "monday", label: "Понеділок 20:00" },
    { value: "tuesday", label: "Вівторок 19:00" },
    { value: "wednesday", label: "Середа 20:00" },
    { value: "thursday", label: "Четвер 19:00" },
    { value: "friday", label: "Пʼятниця 20:00" },
    { value: "all_records", label: "📆 Показати мої записи"}
];

bot.command('start').filter((ctx) => {
    return ctx.msg.chat?.username === "Ad_Impossibilia_Nemo_Obligatur" //"jullibondarenko"
}, async (ctx) => {
    await ctx.reply(`Привіт, <b>${ctx.msg.chat?.first_name}</b>!\n\nАби впевнетись, що Ви адмін, 🗝 введіть пароль.`, {
        parse_mode: 'HTML'
    })
});

bot.on('message', async (ctx) => {
    await ctx.reply('Для запису <i>оберіть</i> та <u>натисніть</u> на відповідний день із списку: ', {
        parse_mode: 'HTML',
        reply_markup: keyboardGenerator(scheduleOptions)
    });
});

//Error handlers
bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
      console.error("Could not contact Telegram:", e);
    } else {
      console.error("Unknown error:", e);
    }
  });

bot.start();