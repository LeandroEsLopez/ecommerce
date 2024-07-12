const userService = require('./userService');
const amqp = require('amqplib/callback_api');

const connectToRabbitMQ = (callback) => {
  const retryInterval = 5000; // Intervalo de reintento en milisegundos

  const tryConnect = () => {
    amqp.connect(process.env.RABBITMQ_URL, (error0, connection) => {
      if (error0) {
        console.error('RabbitMQ connection error:', error0);
        setTimeout(tryConnect, retryInterval);
      } else {
        callback(connection);
      }
    });
  };

  tryConnect();
};

const register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);

    connectToRabbitMQ((connection) => {
      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }
        const queue = process.env.RABBITMQ_QUEUE;
        const msg = JSON.stringify(user);

        channel.assertQueue(queue, {
          durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));
      });
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { user, token } = await userService.loginUser(req.body);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login
};
