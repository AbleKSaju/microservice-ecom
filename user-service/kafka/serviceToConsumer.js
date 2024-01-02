import {kafka} from "./kafkaClient.js"

const consumer= kafka.consumer({groupId:"user-service-group"})

export const serviceToConsumer=async(topic)=>{
    try {

       
        await consumer.connect()
        await consumer.subscribe({topic:topic,fromBeginning:true})
          
        await consumer.run({
            eachMessage:async({message})=>{
               
                const binaryData = message.value
                const convert = binaryData.toString()
              
                const jsnData=JSON.parse(convert)

                
            }
        })

    } catch (error) {
        console.log('Error in consumer in user service',error);
    }

}