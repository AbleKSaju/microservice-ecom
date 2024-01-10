import {Kafka} from 'kafkajs'
export const kafka = new Kafka({
    clientId: 'order-service',
    brokers: ['localhost:9092'],
  });
  