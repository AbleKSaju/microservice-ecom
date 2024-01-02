import { kafka } from "./kafkaClient.js";
const producer = kafka.producer();
export const serviceToProducer = async (data, topic) => {
  try {
    
    console.log('--------data is here in user ',data,'-------------');

    if (!data) {
      console.log("errror");
    }
    await producer.connect();

    const message = {
      data: data,
    };

    const respose = await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(message) }],
    });

    console.log(respose,'this is responce from user service------');
    
  } catch (error) {
    console.error(`Error: ${error.message}`); 
  } finally {
    await producer.disconnect();
  }
};
