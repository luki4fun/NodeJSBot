'use strict';
// lib init
const config = require('./config.json');
const api = require('twitch.tv-api');       // https://dev.twitch.tv/docs/
require('async');
const colors = require('colors');
const { Builder, By, Key, promise, until} = require('selenium-webdriver');  // https://seleniumhq.github.io/selenium/docs/api/javascript/index.html
const { Channel, Options } = require('selenium-webdriver/firefox');
const TwitchBot = require('./ressources/TwitchBot.js');
const DiscordBot = require('./ressources/DiscordBot.js');

// configuration constants init
const headers = {
    'User-Agent':       'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:55.0) Gecko/20100101 Firefox/55.0',
    'Content-Type':     'application/x-www-form-urlencoded'
};
const twitchBotAccounts = [
   { login: '', oAuthKey: 'oauth:', channels: [''], isMaster: true, ADMIN: '' }
];
const twitchAPI = new api({ id: "", secret: "" });

const discordBotAccounts = [
    { token: '', ADMIN: '' }
];

/******************************
 *      TWITCH BOT INIT
 ******************************/
let _twitchBots = [];
twitchBotAccounts.forEach(function (bot) {
    _twitchBots.push(new TwitchBot(bot.ADMIN, bot.login, bot.oAuthKey, bot.channels, twitchAPI, bot.isMaster));
});
_twitchBots.forEach(function (bot) {
    bot.run();
});

/******************************
 *      DISCORD BOT INIT
 ******************************/
let _discordBot = [];
discordBotAccounts.forEach(function (bot) {
    _discordBot.push(new DiscordBot(bot.ADMIN, bot.token));
});
_discordBot.forEach(function (bot) {
    bot.run();
});
/******************************
 *      GLOBAL Functions
 ******************************/
