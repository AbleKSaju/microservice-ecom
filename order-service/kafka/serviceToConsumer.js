import { createOrder } from "../controller/consumerFuntion.js";
import { kafka } from "./kafkaClient.js";

const consumer = kafka.consumer({ groupId: "order-service-group" });

export const serviceToConsumer = async (topic) => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const binaryData = message.value;
        const convert = binaryData.toString();

        const jsnData = JSON.parse(convert);

        if (jsnData.data.event == "create-order-cart") {
          await createOrder(jsnData.data);
        }
      },
    });
  } catch (error) {
    console.log("Error in consumer in order service", error);
  }
};
