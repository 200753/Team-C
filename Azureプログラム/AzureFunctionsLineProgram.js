const axios = require('axios');
module.exports = async function (context, IoTHubMessages) {
  context.log('JavaScript eventhub trigger function processed message', IoTHubMessages);
  // Line Messaging API のエンドポイントとトークン
  const lineApiEndpoint = 'https://api.line.me/v2/bot/message/broadcast';
  const lineAccessToken = 'Q8REdG7BwHxX8Jlg2/XLlcYU9MXOYv/H0nRS8/NM1ks1b50CV+VItBAOZR5TdTFHOsj9nvx1zcg78crw2ZdHJYWPcSzoSDsqpK3Ejpy0oJcikKjn7oDr9ZZJeSmzFK4GGBFLJ68K11QRfDoIjmNGqgdB04t89/1O/w1cDnyilFU=';
  // IoT Hub から受け取ったメッセージを変数に格納
  const messages = IoTHubMessages.map((message) => message.data);
  const firstMessage = messages[0];
  // Line に送信するメッセージ
  const lineMessage = {
    messages: [
      {
        type: 'text',
        text: `エアコンが動作しています`
      }
    ]
  };
  // Line Messaging API に HTTP POST リクエストを送信
  try {
    const response = await axios.post(lineApiEndpoint, lineMessage, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lineAccessToken}`
      }
    });
    context.log('Line Messaging API response:', response.data);
  } catch (error) {
    context.log('Error sending message to Line:', error);
  }
  context.done();
}