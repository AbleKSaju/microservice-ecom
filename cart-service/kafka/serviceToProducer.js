import { kafka } from "./kafkaClient.js";
const producer = kafka.producer();
export const serviceToProducer = async (data, topic) => {
  try {
    
    console.log(`------------data producer-----${data}--------------------`);

    if (!data) {
      console.log("-------------------no data -----------------");
    }
    await producer.connect();

    const message = {
      data: data,
    };

    const respose = await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(message) }],
    });

    console.log('--------------respoce in cart consmer',respose,'---------------');
    
  } catch (error) {
    console.error(`Error: ${error.message}`); 
  } finally {
    await producer.disconnect();
  }
};
