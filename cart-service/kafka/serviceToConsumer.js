import { kafka } from "./kafkaClient.js";
import { addToCartConsumer, createOrder } from "../controller/consumerFuntion.js";
const consumer = kafka.consumer({ groupId: "cart-service-group" });

export const serviceToConsumer = async () => {
  try {

    await consumer.connect();
    await consumer.subscribe({ topic: 'product-topic', fromBeginning: true });
    await consumer.subscribe({ topic: 'user-topic', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, message }) => {
          const binaryData = message.value;
          const convert = binaryData.toString();
          const jsnData = JSON.parse(convert);
          const data = jsnData.data;
      
          if (topic === 'product-topic') {
            console.log("Enter to topic");
            if (data.event == "AddToCart") {
              await addToCartConsumer(data);
            }
          } else if (topic === 'user-topic') {
            await createOrder(data);
          }
        },
      });
  } catch (error) {
    console.log("Error in consumer in cart service", error);
  } 
};
