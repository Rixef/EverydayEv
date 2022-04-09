const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
var loadmsg;

await lib.discord.channels['@0.3.0'].messages.create({
  "channel_id": `${context.params.event.channel_id}`,
  "content": "",
  "tts": false,
  "embeds": [
    {
      "type": "rich",
      "title": `Click here for a list of valid TZs`,
      "description": `**YYYY** = year(i.e. 1970)\n**MM** = month(i.e. 04 would be April)\n**DD** = day(01 is the first)\n**HH** = hour of the day in 24hr clock format(0-23)\n**mm** = minute of the hour(0-59)\n**TZ** = Time Zone(i.e. PST, EDT, CT, etc.)`,
      "color": 0xfe0000,
      "fields": [
        {
          "name": `Commands`,
          "value": `\`\`\`fix\n!set YYYY/MM/DD HH:mm TZ\n!set YYYY/MM/DD TZ\n!set MM/DD HH:mm TZ\n!set MM/DD TZ\n!set DD HH:mm TZ\n!set DD TZ\n!when\n\`\`\``,
          "inline": false
        },
        {
          "name": `Examples`,
          "value": `\`\`\`fix\n!set 2032/04/01 11:30 PDT\n!set 2032/04/01 UTC\n!set 04/01 12:59 BST\n!set 04/01 IST\n!set 01 15:48 CST\n!set 01 AEST\ndisplays days, hours, minutes\n\`\`\``,
          "inline": false
        }
      ],
      "thumbnail": {
        "url": `https://cdn.pixabay.com/photo/2012/04/16/13/49/globe-36066_1280.png`,
        "height": 0,
        "width": 0
      },
      "author": {
        "name": `HELP MENU`
      },
      "url": `http://www.healthstream.com/hlchelp/Administrator/Classes/HLC_Time_Zone_Abbreviations.htm`
    }
  ]
});
