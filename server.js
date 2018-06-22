const line = require('@line/bot-sdk')
const express = require('express')

const config = {
  channelAccessToken: "GJ0DUnzqhbWDQu3zXVwKD9NcH2l6vMQSuSvp90UKm4WxNFky4tXiWYJ7YodSbQpvrysMUBWcY2WRkjwzYxKqZI9nHLEqTNv6VNz4Xc3uWJPpE5ZesKlcRwNpBvBqY7Ols2Jnl8x5gKK7Khtrh0p5XgdB04t89/1O/w1cDnyilFU=",
  channelSecret: "7e2ec436f2fbb41bc5b8e93577a59dec",
}
// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

app.set('views', __dirname + '/views')
app.engine('html', require('ejs').renderFile)

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.get('/job-info', (req, res) => {
  res.render('index.html')
})

// event handler
function handleEvent(event) {
  console.log('msg income')
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  switch(event.message.text){
    case "ค้นหางาน" :
      console.log('ทำแล้วไม่อยากย้ายทีมเลย')
      break
    case 'สายงาน บริการ' :
      return client.replyMessage(event.replyToken, 
        {
          type: 'template',
          altText: 'Buttons alt text',
          template: {
            type: 'carousel',
            columns: [
              {
                title: 'hoge',
                text: 'fuga',
                actions: [
                  { label: 'Go to line.me', type: 'uri', uri: 'line://app/1589205932-WXbBEMXB' },
                  { label: 'Say hello1', type: 'postback', data: 'hello こんにちは' },
                ],
              },
              {
                title: 'hoge',
                text: 'fuga',
                actions: [
                  { label: '言 hello2', type: 'postback', data: 'hello こんにちは', text: 'hello こんにちは' },
                  { label: 'Say message', type: 'message', text: 'Rice=米' },
                ],
              },
            ]
          },
        }
      )

    case 'เลือกตำแหน่งงาน':
    console.log('asdfsfasdf') 
    const flexMessages = {
      type: "bubble",
      header: {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "เลือกประเภทงานโดนใจ",
            "weight": "bold",
            "color": "#aaaaaa",
            "size": "lg"
          }
        ]
      },
      "hero": {
        "type": "image",
        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_4_news.png",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "action": {
          "type": "uri",
          "uri": "http://linecorp.com/"
        }
      },
      "body": {
        "type": "box",
        "layout": "horizontal",
        "spacing": "md",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "flex": 2,
            "contents": [
              {
                "type": "text",
                "text": "วิศวกรรมคอมพิวเตอร์",
                "gravity": "top",
                "size": "md",
                "flex": 1,
                "action": {
                  "type": "uri",
                  "uri": "http://linecorp.com/"
                }
              },
              {
                "type": "separator"
              },
              {
                "type": "text",
                "text": "Hay fever goes wild",
                "gravity": "center",
                "size": "md",
                "flex": 2
              },
              {
                "type": "separator"
              },
              {
                "type": "text",
                "text": "LINE Pay Begins Barcode Payment Service",
                "gravity": "center",
                "size": "md",
                "flex": 2
              },
              {
                "type": "separator"
              },
              {
                "type": "text",
                "text": "LINE Adds LINE Wallet",
                "gravity": "bottom",
                "size": "md",
                "flex": 1
              }
            ]
          }
        ]
      }
    }
    return client.replyMessage(event.replyToken, flexMessages)
      // return client.replyMessage(event.replyToken, {
      //   'type': 'text',
      //   'text': 'line://app/1589205932-WXbBEMXB'
      // })
    default:
      const echo = { type: 'text', text: event.message.text };
      return client.replyMessage(event.replyToken, echo);
  }
  
  return client.replyMessage(event.replyToken, echo)
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
