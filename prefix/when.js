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
    channel_id: `${context.params.event.channel_id}`,
    content: Math.floor(diffdays)+" days, "+Math.floor(diffhours % 24)+" hours, "+Math.floor(60 - nowminute)+" minutes.",
  });
}
else if(messageContents.length === 0)//if it doesn't exist already
{
  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `You must set a date and/or time first!\n\`!cmds\` For assistance.`,
  });
}

//for using ESPN's api-------------------------------------------------------------------------------------------------------
// make API request
/*
let result = await lib.http.request['@1.1.6'].get({
  url: `https://site.api.espn.com/apis/site/v2/sports/racing/f1/scoreboard` // required
});
let file = result.data;
*/
//console.log(file.events[0].name);
//console.log(file.events[0].competitions[4].type.abbreviation);
//console.log(file.events[0].competitions[4].status.type.detail);
/*
await lib.discord.channels['@0.3.0'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: `${file.events[0].name} ${file.events[0].competitions[4].type.abbreviation}\n${file.events[0].competitions[4].status.type.detail}`,
});
*/
// Calculate milliseconds in a year
//const minute = 1000 * 60;//only using these three
//const hour = minute * 60;
//const day = hour * 24;
//const year = day * 365;//fuck the year for now

//new Date(year, month, day, hours, minutes, seconds, milliseconds);
//var now = new Date();
//var nowminute = now.getMinutes();
//now = Date.UTC(now.getFullYear(),now.getMonth()+1,now.getDate(),now.getHours(),now.getMinutes());
//console.log(now);
//var nowmonth = now.getMonth()+1;//since this is 0-indexed it returns 0-11 so +1 it
//var nowmonthday = now.getDate();//# 1-31(day of the month)
//var nowyear = now.getFullYear();//# year yyyy format(the current year)
//var nowhour = now.getHours();//# 0-23(hour of the day)
//var nowminute = now.getMinutes();//# 0-59(minute of the hour)
//var ampm = "";//for use when converting 24hr->12hr clock

//var then = Date.UTC(process.env.setYear, 4, 9, 22, 0);//for testing, setting a static future date
//console.log(then);
//var diffms = then - now;
//var diffsecs = diffms/1000;
//var diffmins = diffsecs/60;
//var diffhours = diffmins/60;
//var diffdays = diffhours/24;
//console.log(diffms);
//console.log(diffsecs);
//console.log(diffmins);
//console.log(diffhours);
//console.log(diffdays);
//console.log(Math.floor(diffdays)+" days");
//console.log(Math.floor(diffhours % 24)+" hours");
//console.log(Math.floor(60 - nowminute)+" minutes");
//console.log((then - now)/1000);
//console.log( (((((then - now)/1000)/60)/60)/24) );
//var thensec = then.getTime()/1000;
//var nowsec = now.getTime()/1000;
//var diffsec = thensec - nowsec;
//console.log(diffsec);
//var diff = new Date(then.getTime() - now.getTime());//milliseconds difference
//var diff = then.getTime() - now.getTime();//ms diff
//var difftotalsecs = Math.floor(diff/1000);
//var difftotalmins = Math.floor(difftotalsecs/60);//difference in minutes(total)
//var difftotalhours = Math.floor(difftotalmins/60);//difference in hours(total)
//var difftotaldays = Math.floor(difftotalhours/24);//difference in days(total)
/*
console.log(then.getTime());
console.log(now.getTime());
console.log(diff);
console.log(difftotalsecs);
console.log(difftotalmins);
console.log(difftotalhours);
console.log(difftotaldays);
*/
/*
if(nowhour > 12)//some 24hr->12hr clock shit
{
  nowhour = nowhour - 12;
    ampm = "PM";
}
else if(nowhour < 1)
{
  nowhour = 12;
    ampm = "AM";
}
else
{ampm = "AM";}
if(nowminute < 10)
{nowminute = "0"+nowminute;}
document.getElementById("demo").innerHTML = nowhour+":"+nowminute+" "+ampm+" "+nowmonth+"/"+nowmonthday+"/"+nowyear;
document.getElementById("demo").innerHTML += "<br>";
document.getElementById("demo").innerHTML += diff;
*/
