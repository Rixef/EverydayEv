const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

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
var nowyear = now.getFullYear(),nowmonth = now.getMonth(),nowday = now.getDate(),nowhour = now.getHours(),nowminute = now.getMinutes();
var loadmsg;

var getsetdate = "", getsettime = "";
var getsetyear = "",getsetmonth = "",getsetday = "",getsethour,getsetminute;
var getsettimezoneoffset = 0;

//everydayevdbchannel id:
//var everydayevdbchannel_id = `961790564716658698`;
const searchmsgs = await lib.discord.channels['@0.3.0'].messages.list({
  channel_id: `${process.env.everydayevdbchannel_id}`, // required
  limit: 100 
});
const messageContents = searchmsgs
.filter((msg) => msg.content.includes("!set"))
.map((msg) => msg.id);
if(messageContents.length > 0)//if it does exist already
{
  //retrieve the message from the filtered messageContents list
  loadmsg = await lib.discord.channels['@0.3.0'].messages.retrieve({
    message_id: messageContents[0],
    channel_id: `${process.env.everydayevdbchannel_id}`
  });
  
  //YYYY/MM/DD HH:MM TZO
  //YYYY/MM/DD TZO
  //MM/DD HH:MM TZO
  //MM/DD TZO
  //DD HH:MM TZO
  //DD TZO
  if(loadmsg.content.includes(":"))//if there's time
  {
    var getsetdatetime = loadmsg.content.replace("!set ","").split(" ");
    getsetdate = getsetdatetime[0];//date
    getsettime = getsetdatetime[1];//time
    getsettimezoneoffset = parseInt(TZs[getsetdatetime[2].toUpperCase()]);//timezoneoffset or timezone
    getsetdate = getsetdate.split("/");//split year/month/day
    getsettime = getsettime.split(":");//split hour:minute
    getsethour = getsettime[0];
    getsetminute = getsettime[1];
    if(getsetdate.length === 3)//YYYY/MM/DD
    {
      getsetyear = getsetdate[0];
      getsetmonth = getsetdate[1];
      getsetday = getsetdate[2];
    }
    else if(getsetdate.length === 2)//MM/DD
    {
      getsetyear = nowyear;
      getsetmonth = getsetdate[0];
      getsetday = getsetdate[1];
    }
    else if(getsetdate === 1)//DD
    {
      getsetyear = nowyear;
      getsetmonth = nowmonth;
      getsetday = getsetdate[0];
    }
  }
  else//no time
  {
    var getsetdatetime = loadmsg.content.replace("!set ","").split(" ");//split date timezoneoffset
    getsetdate = getsetdatetime[0].split("/");//split year/month/day
    getsettimezoneoffset = parseInt(TZs[getsetdatetime[1].toUpperCase()]);//timezone
  }
  
  if(getsettime === "")//if there's no time
  {
    getsethour = 0;
    getsetminute = 0;
  }
  //date is already in UTC time 'cause Autocode servers have it set to that
  now.setMinutes(now.getMinutes() + getsettimezoneoffset);// date now in setter's time
  var then = new Date(getsetyear, getsetmonth-1, getsetday, getsethour, getsetminute);
  var diffms = then - now;
  var diffsecs = diffms/1000;
  var diffmins = diffsecs/60;
  var diffhours = diffmins/60;
  var diffdays = diffhours/24;
  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `960786323868897303`,
    content: Math.floor(diffdays)+" days, "+Math.floor(diffhours % 24)+" hours, "+Math.floor(60 - nowminute)+" minutes.",
  });
}
else if(messageContents.length === 0)//if it doesn't exist already
{
  /*await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `960786323868897303`,
    content: `You must set a date and/or time first!\n\`!cmds\` For assistance.`,
  });*/
}
