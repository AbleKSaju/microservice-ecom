import { kafka } from "./kafkaClient.js";
const producer = kafka.producer();
export const serviceToProducer = async (data, topic) => {
  try {
    console.log(data, topic, "--------------this is producer data");

    if (!data) {
      console.log("errror ");
    }
    await producer.connect();

    const message = {
      data: data,
    };

    const respose = await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(message) }],
    });

    console.log(respose);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    await producer.disconnect();
  }
};
