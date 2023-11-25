import mongoose from "mongoose";
const schema = new mongoose.Schema({
    username:{
        type:String
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    profile:{
        type:String
    }
});

export default mongoose.model.Users || mongoose.model("User",schema);