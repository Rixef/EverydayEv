const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
var loadmsg;

var TZs = {
  "ET": -05*60,
  "CT": -06*60,
  "MT": -07*60,
  "PT": -08*60,
  "AK": -09*60,
  "HAST": -10*60,
  "MST": -07*60,
  "AST": -04*60,
  "MOST": 0*60,
  "UTC": 0*60,
  "GMT": 0*60,
  "GST": 0*60,
  "WET": 01*60,
  "CET": 01*60,
  "RST": 01*60,
  "CEST": 01*60,
  "ECT": 01*60,
  "JST": 02*60,
  "GTBST": 02*60,
  "MEST": 02*60,
  "EGST": 02*60,
  "SST": 02*60,
  "SAST": 02*60,
  "EET": 02*60,
  "ISST": 02*60,
  "EEST": 02*60,
  "NMST": 02*60,
  "ARST": 03*60,
  "ABST": 03*60,
  "MSK": 03*60,
  "EAT": 03*60,
  "IRST": 03*60+30/*with 30mins(UTC+03:30)*/,
  "ARBST": 04*60,
  "AZT": 04*60,
  "MUT": 04*60,
  "GET": 04*60,
  "AMT": 04*60,
  "AFT": 04*60+30/*+30mins(UTC+04:30)*/,
  "YEKT": 05*60,
  "PKT": 05*60,
  "WAST": 05*60,
  "IST": 05*60+30/*+30m(UTC+05:30)*/,
  "SLT": 05*60+30/*+30m(UTC+05:30)*/,
  "NPT": 05*60+45/*+45m(UTC+05:45)*/,
  "BTT": 06*60,
  "BST": 06*60,
  "NCAST": 06*60,
  "MYST": 06*60+30/*+30m(UTC+06:30)*/,
  "THA": 07*60,
  "KRAT": 07*60,
  "": 08*60,
  "IRKT": 08*60,
  "SNST": 08*60,
  "AWST": 08*60,
  "TIST": 08*60,
  "UST": 08*60,
  "TST": 09*60,
  "KST": 09*60,
  "YAKT": 09*60,
  "CAUST": 09*60+30/*+30m(UTC+09:30)*/,
  "ACST": 09*60+30/*+30m(UTC+09:30)*/,
  "EAST": 10*60,
  "AEST": 10*60,
  "WPST": 10*60,
  "TAST": 10*60,
  "VLAT": 10*60,
  "SBT": 11*60,
  "NZST": 12*60,
  "UTC12": 12*60,
  "FJT": 12*60,
  "PETT": 12*60,
  "PHOT": 13*60,
  "AZOST": -01*60,
  "CVT": -01*60,
  "ESAST": -03*60,
  "ART": -03*60,
  "SAEST": -03*60,
  "GNST": -03*60,
  "MVST": -03*60,
  "NST": -03*60,
  "PRST": -04*60,
  "CBST": -04*60,
  "SAWST": -04*60,
  "PSAST": -04*60,
  "VST": -04*60+30/*-30m(UTC-04:30)*/,
  "SAPST": -05*60,
  "EST": -05*60,
  "CAST": -06*60,
  "CST": -06*60,
  "CCST": -06*60,
  "MSTM": -07*60,
  "PST": -08*60,
  "SMST": -11*60,
  "BIT": -12*60,
}

var now = new Date();
var nowyear = now.getFullYear(),nowmonth = now.getMonth()+1,nowday = now.getDate(),nowhour = now.getHours(),nowminute = now.getMinutes();
var getsetdate = "", getsettime = "", getsettimezoneoffset = "";
var getsetyear,getsetmonth,getsetday,getsethour,getsetminute;
var timezoned = false;

//your database channel id:
var everydayevdbchannel_id = `961790564716658698`;
//search the database channel for your storage message:
const searchmsgs = await lib.discord.channels['@0.3.0'].messages.list({
  channel_id: `${everydayevdbchannel_id}`, // required
  limit: 100
});
const messageContents = searchmsgs
.filter((msg) => msg.content.includes("!set"))
.map((msg) => msg.id);
//if it found it or not:
if(messageContents.length > 0)//if it does exist already
{
  //retrieve the message from the filtered messageContents list
  loadmsg = await lib.discord.channels['@0.3.0'].messages.retrieve({
    message_id: messageContents[0],
    channel_id: `${everydayevdbchannel_id}`
  });
  await lib.discord.channels['@0.3.0'].messages.update({
    message_id: loadmsg.id,
    channel_id: loadmsg.channel_id,
    "content": "!set",
    "tts": false,
    "embeds": [
      {
        "type": "rich",
        "title": `Storage`,
        "description": "",
        "color": 0x00FFFF,
        "fields": [
          {
            "name": `Date Time TZ`,
            "value": `${context.params.event.content}`,
            "inline": true
          },
          {
            "name": `Pings`,
            "value": loadmsg.embeds[0].fields[1].value,
            "inline": true
          }
        ]
      }
    ]
  });
}
else if(messageContents.length === 0)//if it doesn't exist already
{
  await lib.discord.channels['@0.3.0'].messages.create({
    "channel_id": `${process.env.everydayevdbchannel_id}`,
    "content": "!set",
    "tts": false,
    "embeds": [
      {
        "type": "rich",
        "title": `Storage`,
        "description": "",
        "color": 0x00FFFF,
        "fields": [
          {
            "name": `Date Time TZ`,
            "value": `${context.params.event.content}`,
            "inline": true
          },
          {
            "name": `Pings`,
            "value": `@here`,
            "inline": true
          }
        ]
      }
    ]
  });
}
