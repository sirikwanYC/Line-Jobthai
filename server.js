
              },
              {
                title: 'คนทอดหมู',
                text: 'หมูปิ้งป้าน้อย ตำบลสุเทพ อ.เมือง จ.เชียงใหม่',
                actions: [
                  { label: 'ดูรายละเอียด', type: 'uri', uri: 'line://app/1589205932-WXbBEMXB' },
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
          "type": "imagemap",
          "baseUrl": "https://example.com/bot/images/rm001",
          "altText": "This is an imagemap",
          "baseSize": {
            "height": 1040,
            "width": 1040
          },
          "actions": [
            {
              "type": "uri",
              "linkUri": "https://example.com/",
              "area": {
                "x": 0,
                "y": 0,
                "width": 520,
                "height": 1040
              }
            },
            {
              "type": "message",
              "text": "Hello",
              "area": {
                "x": 520,
                "y": 0,
                "width": 520,
                "height": 1040
              }
            }
          ]
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

  switch (event.message.text) {
    case "ค้นหางาน":
  switch(event.message.text){

    case (event.message.text.indexOf('สมัครงาน ตำแหน่ง') !== -1) :
      const message = { type: 'text', text: 'คุณชื่ออะไร' }
      return client.replyMessage(event.replyToken, message)
    case (event.message.text.indexOf('ฉันชื่อ ') != --1) :
      const message = { type: 'text', text: 'คุณเพศอะไร' }
      return client.replyMessage(event.replyToken, message)
    case "ค้นหางาน" :
              },
              {
                title: 'คนทอดหมู',
                text: 'หมูปิ้งป้าน้อย ตำบลสุเทพ อ.เมือง จ.เชียงใหม่',
                actions: [
                  { label: 'ดูรายละเอียด', type: 'uri', uri: 'line://app/1589205932-WXbBEMXB' },
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
          "type": "imagemap",
          // "baseUrl": "https://www.thinknet.co.th",
          "altText": "This is an imagemap",
          "baseSize": {
            "height": 1040,
            "width": 1040
          },
          "actions": [
            {
              "type": "uri",
              "linkUri": "https://gitlab.thinknet.co.th/uploads/system/group/avatar/9/logo.jpg",
              "area": {
                "x": 0,
                "y": 0,
                "width": 520,
                "height": 1040
              }
            },
            {
              "type": "message",
              "text": "Hello",
              "area": {
                "x": 520,
                "y": 0,
                "width": 520,
                "height": 1040
              }
            }
          ]
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
