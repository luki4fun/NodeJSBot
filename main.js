'use strict';
// lib init
const config = require('./config.json');
const tmi = require('tmi.js');              // http://tmi.twitch.tv/group/user/finalbosstv/chatters
const Twitch = require('twitch-js');        // https://twitch-devs.github.io/twitch-js/docs/getting-started
const api = require('twitch.tv-api');       // https://dev.twitch.tv/docs/
const Discord = require('discord.io');      // https://izy521.gitbooks.io/discord-io/content/
require('async');
const sprintf = require('sprintf-js').sprintf,
    vsprintf = require('sprintf-js').vsprintf;
const colors = require('colors');
const in_array = require('in_array');
const request = require('request');
const { Builder, By, Key, promise, until} = require('selenium-webdriver');  // https://seleniumhq.github.io/selenium/docs/api/javascript/index.html
const { Channel, Options } = require('selenium-webdriver/firefox');
const _twitch = ("[Twitch]  [%s] ").magenta;
const _discord = ("[Discord] [%s] ").blue;

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
function TwitchBot(ADMIN, login, oAuthKey, channels, twitchAPI, isMaster = false){
    this.ADMIN = ADMIN;
    this.login = login;
    this.oAuthKey = oAuthKey;
    this.channels = channels;
    this.isMaster = isMaster;
    this.twitchAPI = twitchAPI;
    this._bot = {};
    let _self = this;
    this.run = async function(){
        this._bot = new Twitch.client({
            options: { debug: false, clientId: this.login },
            connection: { cluster: "aws", reconnect: true },
            identity: { username: this.login, password: this.oAuthKey },
            channels: this.channels
        });
        this._bot.connect();

        this._bot.on('connected', function (address, port) {
            /**
             * ToDo:
             */
            console.log(sprintf(_twitch, _self._bot.username) + "Bot connected");
        });
        this._bot.on('chat', function (channel, user, message, self) {
            /**
             * ToDo:
             */
            if(message === "!ping") {
                _self._bot.say(channel, "pong!");
            }
        });
    }
}

let _twitchBots = [];
twitchBotAccounts.forEach(function(bot){
    _twitchBots.push(new TwitchBot(bot.ADMIN, bot.login, bot.oAuthKey, bot.channels, twitchAPI, bot.isMaster));
});
_twitchBots.forEach(function(bot){
    bot.run();
});

/******************************
 *      DISCORD BOT INIT
 ******************************/
function DiscordBot(ADMIN, token){
    this.ADMIN = ADMIN;
    this.token = token;
    this.login = "unknown";
    this._bot = {};
    let _self = this;
    this.run = async function(){
        this._bot = new Discord.Client({
            token: this.token,
            autorun: true
        });
        this._bot.connect();

        this._bot.on('ready', function (evt) {
            /**
             * ToDo:
             */
            console.log(sprintf(_discord, _self._bot.username) + "Bot connected");
            _self.login = _self._bot.username;
        });
        this._bot.on('message', function (user, userID, channelID, message, evt) {
            /**
             * ToDo:
             */
            if(message === "!ping") {
                _self._bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            }
        });
    }
}

let _discordBot = [];
discordBotAccounts.forEach(function(bot){
    _discordBot.push(new DiscordBot(bot.ADMIN, bot.token));
});
_discordBot.forEach(function(bot){
    bot.run();
});

/******************************
 *      GLOBAL Functions
 ******************************/
function getCurTime(){
    return Math.floor(new Date() / 1000);
}
