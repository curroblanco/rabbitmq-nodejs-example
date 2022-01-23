const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const amqp = require("amqplib/callback_api");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const queue = "node_queue";
const rabbitUrl = "amqp://localhost"
const port = 3000;


amqp.connect(rabbitUrl, function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    channel.assertQueue(queue, {
      durable: true,
    });

    channel.consume(
        queue,
        function (msg) {
          if (msg.content) {
            console.log(" [x] %s", msg.content.toString());
          }
        },
        {
          noAck: true,
        }
      );

    app.post("/", function (req, res) {
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(req.body)), {
        persistent: true,
      });
      console.log(req.body);
      res.send(JSON.stringify(req.body));
    });
  });
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
