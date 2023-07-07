import mongoose from "mongoose";

let isConnected = false;

export const connectedToDB = async()=>{
    mongoose.set('strictQuery',true)
    if(isConnected){
        console.log(`MongoDB is Connected`);
        return;
    }
    else{
        try{
            await mongoose.connect(process.env.MONGODB_URI,{
                dbName: 'share_prompt',
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            isConnected=true;
            console.log('Connected')
        }
        catch(err){
            console.log(err);
        }
    }
}
