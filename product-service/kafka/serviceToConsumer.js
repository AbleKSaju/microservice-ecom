import {kafka} from "./kafkaClient.js"

const consumer= kafka.consumer({groupId:"product-service-group"})

export const serviceToConsumer=async(topic)=>{
    try {

        console.log('-------product socnume----------');
        await consumer.connect()
        await consumer.subscribe({topic:topic,fromBeginning:true})
          
        await consumer.run({
            eachMessage:async({message})=>{
               
                const binaryData = message.value
                const convert = binaryData.toString()
              
                const jsnData=JSON.parse(convert)

                console.log('--------------------------',jsnData.data)
                if(jsnData?.data?.event=='cart-data'){
                    return jsnData.data
                }
            }
        })

    } catch (error) {
        console.log('Error in consumer in product service',error);
    }

}