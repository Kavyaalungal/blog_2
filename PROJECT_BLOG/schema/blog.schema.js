import mongoose from "mongoose";
 const schema = new mongoose.Schema({
    userId:{
        type:String
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    file:{
        type:String
    }
  
 })
  export default mongoose.model.Blogs || mongoose.model("Blog",schema)




