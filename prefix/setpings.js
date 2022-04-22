const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
var loadmsg;

var pings = context.params.event.content.replace("!setpings ","").split(",");
pings = pings.map(i => '@' + i);

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
  //update db message
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
            "value": loadmsg.embeds[0].fields[0].value,
            "inline": true
          },
          {
            "name": `Pings`,
            "value": `${pings}`,
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
    "content": `You need to set a date and time first with \`!set\` command!\n\`!cmds\` For assistance.`,
  });
}
