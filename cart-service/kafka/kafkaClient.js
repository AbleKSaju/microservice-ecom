import {Kafka} from 'kafkajs'
export const kafka = new Kafka({
    clientId: 'cart-service',
    brokers: ['localhost:9092'],
  });
  