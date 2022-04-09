const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let result = await lib.discord.users['@0.1.1'].me.status.update({
  activity_name: context.params.event.content.replace("!status ",""), // The custom status!
  activity_type: 'GAME', // What it is doing.
  status: 'ONLINE', // Change this to DND or IDLE.
});

await lib.discord.channels['@0.3.0'].messages.create({
  "channel_id": `${context.params.event.channel_id}`,
  "content": "Status changed",
});
