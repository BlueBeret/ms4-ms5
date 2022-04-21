const amqp = require('amqplib/callback_api')
const express = require('express')
const app = express()
const path = require('path')
const port = 5004
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
    sendMessageToQueue('checkout', req.body.cart)
    res.send("Checkout anda sedang diproses")
})

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/index.html'));
// })

const sendMessageToQueue = (queueName, msg) => {
    const id = msg.split(',').map(x => parseInt(x))
    const payload = {
        action: 'checkout',
        products: id
    }
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
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)))
            console.log(" [x] Sent %s => %s", payload, queue)
        })
    })
}



app.listen(port, () => {
    console.log(`Service 4 listening on port ${port}`)
})