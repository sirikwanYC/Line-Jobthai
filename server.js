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
  const { text } = event.message
  const findJobPatt = /สมัครงาน ตำแหน่ง/
  const myNamePatt = /ฉันชื่อ|ชื่อ|นาย|นาง|นางสาว/ 
  const genderPatt = /ฉันเพศ/
  const agePatt = /ฉันอายุ/

  if(text) {
    if(findJobPatt.test(text)) {
      return client.replyMessage(event.replyToken, 
        { type: 'text', text: 'คุณชื่ออะไร' }
      )
    } else if(myNamePatt.test(text)) {
      const genderTemplate = {
        type: 'template',
        altText: 'Buttons alt text',
        template: {
          type: 'buttons',
          title: "เพศ",
          text: "กรุณาเลือกเพศ",
          actions: [
            { label: 'ชาย', type: 'message', text: 'ฉันเพศ ชาย' },
            { label: 'หญิง', type: 'message', text: 'ฉันเพศ หญิง' }
          ]
        },
      }
      return client.replyMessage(event.replyToken, genderTemplate)
    } else if(genderPatt.test(text)) {
      const genderSex = {
        type: 'template',
        altText: 'Buttons alt text',
        template: {
          type: 'buttons',
          title: "อายุ",
          text: "กรุณาเลือกช่วงอายุของคุณ",
          actions: [
            { label: '18-30', type: 'message', text: 'ฉันอายุ 18-30' },
            { label: '31-40', type: 'message', text: 'ฉันอายุ 31-40' },
            { label: '41-50', type: 'message', text: 'ฉันอายุ 41-50' },
            { label: '51-60', type: 'message', text: 'ฉันอายุ 51-60' }
        ]
        },
      }
      return client.replyMessage(event.replyToken, genderSex)
    } else if (agePatt.test(text)) {
      return client.replyMessage(event.replyToken,
        { type: 'text', text: 'ขอบคุณครับ' }
      )
    } else {
      switch (text) {
        case 'ค้นหางาน':
          console.log('ทำแล้วไม่อยากย้ายทีมเลย')
          break
        case 'สายงานที่แนะนำ':
        case 'สายงาน บริการ':
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
              }
            },
          )
        case 'เลือกสายงาน':
          return client.replyMessage(event.replyToken,
            {
              type: 'flex',
              altText: 'This is flex',
              contents: {
                type: 'bubble',
                header: {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    {
                      type: "text",
                      text: "เลือกประเภทงานโดนใจ",
                      weight: "bold",
                      color: "#aaaaaa",
                      size: "lg"
                    }
                  ]
                },
                hero: {
                  type: "image",
                  url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_4_news.png",
                  size: "full",
                  aspectRatio: "20:13",
                  aspectMode: "cover",
                  action: {
                    type: "uri",
                    uri: "http://linecorp.com/"
                  }
                },
                body: {
                  type: "box",
                  layout: "horizontal",
                  "spacing": "md",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "vertical",
                      "flex": 2,
                      "contents": [
                        {
                          "type": "text",
                          "text": "IT",
                          "gravity": "top",
                          "size": "md",
                          "flex": 1,
                          "action": {
                            "type": "text",
                            "text": "สายงาน IT"
                          }
                        },
                        {
                          "type": "separator"
                        },
                        {
                          "type": "text",
                          "text": "Art",
                          "gravity": "center",
                          "size": "md",
                          "flex": 2,
                          "action": {
                            "type": "text",
                            "text": "สายงาน Art"
                          }
                        },
                        {
                          "type": "separator"
                        },
                        {
                          "type": "text",
                          "text": "Science",
                          "gravity": "center",
                          "size": "md",
                          "flex": 2,
                          "action": {
                            "type": "text",
                            "text": "สายงาน Science"
                          }
                        },
                        {
                          "type": "separator"
                        },
                        {
                          "type": "text",
                          "text": "Engineer",
                          "gravity": "bottom",
                          "size": "md",
                          "flex": 1,
                          "action": {
                            "type": "text",
                            "text": "สายงาน Engineer"
                          }
                        }
                      ]
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
    }
  }

  // const caseWhatYourName = text.indexOf('คุณชื่ออะไร') !== -1: 


  return client.replyMessage(event.replyToken, echo)
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
})
