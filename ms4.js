const amqp = require('amqplib/callback_api')
const express = require('express')
const app = express()
const path = require('path')
const port = 5004
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
    sendMessageToQueue('checkout', req.body.msg)
    res.send("Checkout anda sedang diproses")
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

const sendMessageToQueue = (queueName, msg) => {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1
            }
            var queue = queueName

            channel.assertQueue(queue, {
                durable: false
            })
            channel.sendToQueue(queue, Buffer.from(msg))
            console.log(" [x] Sent %s => %s", msg, queue)
        })


        setTimeout(function () {
            connection.close()
            process.exit(0)
        }, 500)
    })
}



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})