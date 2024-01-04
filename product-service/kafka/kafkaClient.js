import {Kafka} from 'kafkajs'
export const kafka = new Kafka({
    clientId: 'product-service',
    brokers: ['localhost:9092'],
  });
  