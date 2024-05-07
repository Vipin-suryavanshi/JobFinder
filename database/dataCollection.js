import mongoose from "mongoose";

export const dataCollection = ()=>{
    mongoose.connect(process.env.MONGOURL,{
        dbName:"MERN_STACK_JOB_SEEKING"
    }).then(()=>{
      console.log('CONNECTED TO DataBase!');  
    }).catch((err)=>{
        console.log(`some error occured while connection to dabase: ${err}`);
    })
}