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

  switch (event.message.text) {
    case 'สมัครงาน ตำแหน่ง':
      return client.replyMessage(event.replyToken,
        { type: 'text', text: 'คุณชื่ออะไร' }
      )
    case 'ฉันชื่อ':
      return client.replyMessage(event.replyToken,
        { type: 'text', text: 'คุณเพศอะไร' }
      )

    case 'ฉันเพศ':
      return client.replyMessage(event.replyToken,
        { type: 'text', text: 'คุณอายุเท่าไหร่' }
      )

    case 'ฉันอายุ':
      return client.replyMessage(event.replyToken,
        { type: 'text', text: 'ขอบคุณครับ' }
      )

    case 'ค้นหางาน':
      console.log('ทำแล้วไม่อยากย้ายทีมเลย')
      break
    case 'สายงาน บริการ' || 'สายงานที่แนะนำ':
      return client.replyMessage(event.replyToken,
        {
          type: 'template',
          altText: 'ตำแหน่งงานที่ต้องการ',
          template: {
            type: 'carousel',
            columns: [
              {
                title: 'เชฟ',
                text: 'โรงแรมหนองป่าหอย ต้องการยอดฝีมือนักทำอาหาร ด่วน! ตำแหน่งมีจำกัด',
                actions: [
                  { label: 'ดูรายละเอียด', type: 'uri', uri: 'line://app/1589205932-WXbBEMXB?career=เชฟ' },
                  { label: 'สมัครเลย', type: 'message', text: 'สมัครงาน ตำแหน่ง เชฟ' },
                ],
              },
              {
                title: 'คนทอดหมู',
                text: 'หมูปิ้งป้าน้อย ตำบลสุเทพ อ.เมือง จ.เชียงใหม่',
                actions: [
                  { label: 'ดูรายละเอียด', type: 'uri', uri: 'line://app/1589205932-WXbBEMXB?career=คนทอดหมู' },
                  { label: 'สมัครเลย', type: 'message', text: 'สมัครงาน ตำแหน่ง คนทอดหมู' },
                ],
              },
            ]
          },
        }
      )
    case 'เลือกตำแหน่งงาน':
      return client.replyMessage(event.replyToken,
        {
          type: 'template',
          altText: 'ตำแหน่งงานที่ต้องการ',
          template: {
            type: 'bubble',
            "header": {
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
            }
          }
        }
      )
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
