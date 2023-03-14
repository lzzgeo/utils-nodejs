const { WebSocket } = require('ws');
const cron = require('node-cron');

var wsArr = []
function func() {

    let hkey = process.env.HEADER_KEY
    let sids = process.env.SESSION_IDS.split(",")

    let i = 0;
    while (i < 100) {

        for (let j = 0; j < sids.length; ++j) {

            let ws = null;
            
            try {
                ws = new WebSocket('ws://127.0.0.1:3000/websocket', {
                    headers: {
                        [hkey]: sids[j],
                    },
                });

                ws.on('open', () => console.log('Client open!'));

                wsArr.push(ws);
            } catch (error) {
                continue;
            }
            

            

            i += 1
        }
    }
}


cron.schedule('* * * * *', function() {
    func();
    console.log('running a task every minute');
  });