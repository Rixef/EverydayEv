const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
var loadmsg;

// make API request
let result = await lib.http.request['@1.1.6'].get({
  url: `https://site.api.espn.com/apis/site/v2/sports/racing/f1/scoreboard` // required
});
let file = result.data;

//${file.events[0].competitions[4].type.abbreviation} //Race/Qual/Practice/Etc
//${file.events[0].competitions[4].status.type.detail} //Date Time TZ in format: Sun, April 24th at 9:00 AM EDT

await lib.discord.channels['@0.3.0'].messages.create({
  "channel_id": `${context.params.event.channel_id}`,
  "content": "",
  "tts": false,
  "embeds": [
    {
      "type": "rich",
      "title": `🏁Next Upcoming Race🏁`,
      "description": `__**${file.events[0].name}**__\n**\`\`\`fix\n📍\n${file.events[0].circuit.fullName}\n${file.events[0].circuit.address.city}, ${file.events[0].circuit.address.country}\n\`\`\`**`,
      "color": 0x00FFFF,
      "fields": [
        {
          "name": `${file.events[0].competitions[0].type.abbreviation}`,
          "value": `**\`\`\`fix\n⏰\n${file.events[0].competitions[0].status.type.detail}\`\`\`**`
        },
        {
          "name": `${file.events[0].competitions[1].type.abbreviation}`,
          "value": `**\`\`\`fix\n⏰\n${file.events[0].competitions[1].status.type.detail}\`\`\`**`
        },
        {
          "name": `${file.events[0].competitions[2].type.abbreviation}`,
          "value": `**\`\`\`fix\n⏰\n${file.events[0].competitions[2].status.type.detail}\`\`\`**`
        },
        {
          "name": `${file.events[0].competitions[3].type.abbreviation}`,
          "value": `**\`\`\`fix\n⏰\n${file.events[0].competitions[3].status.type.detail}\`\`\`**`
        },
        {
          "name": `${file.events[0].competitions[4].type.abbreviation}`,
          "value": `**\`\`\`fix\n⏰\n${file.events[0].competitions[4].status.type.detail}\`\`\`**`
        }
      ],
      "thumbnail": {
        "url": `https://www.pikpng.com/pngl/m/537-5379367_f1-racing-magazine-f1-racing-magazine-logo-clipart.png`,
        "height": 0,
        "width": 0
      }
    }
  ]
});
