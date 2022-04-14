# Microservice 4 & Microservice 5

This is a project for Scalable App Development class.

## Installation

- Install erlang, [rabbitmq](https://www.rabbitmq.com/download.html), [npm](https://www.npmjs.com/package/npm), and [docker](https://docs.docker.com/get-docker/)
- start docker daemon service 
`systemctl start docker` 
- run rabbitmq service  
`docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management`
- clone the repo and change to project directory  
`git clone && cd ms4-ms5`
- install dependencies  
`npm install`


## Run

- start the consumer service first (ms5)  
`node ms5.js`
- start the producer service (ms4),  
`node ms4.js`
- open `localhost:5004` in your browser
- try to submit some value and check your `ms5` service console

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)