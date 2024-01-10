import { Order } from "../model/orderModel.js";

//display order
export const showAllOrder=async(req,res)=>{
    try {
        
const userId=req.user.id 

        const order = await Order.find({userId})
        if(!order){
          return  res.status(400).json("No Order found")
        }

        res.status(200).json(order)
    } catch (error) {
       res.status(400).json("Error happnec in order-service in the showOrder",error)
    }
}


//cansel order
//retrun order
//order status
//a specific order    

  





