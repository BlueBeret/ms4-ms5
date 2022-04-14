var amqp = require('amqplib/callback_api')

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

sendMessageToQueue('hello', "Houston ada masalah")
sendMessageToQueue('hello', "Houston masalah terselesaikan")

