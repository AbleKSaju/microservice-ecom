import mongoose from 'mongoose'
import  mongodbSession from 'connect-mongodb-session'
import session  from 'express-session';


const mongoSession=mongodbSession(session)
 

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL, {
           
            
        });

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
       
    }
};


export const store= new mongoSession({
    uri:process.env.MONGO_URL,
    collection:"SessionDB",
})

