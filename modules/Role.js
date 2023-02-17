import { Schema,model } from "mongoose";



const Role = new Schema({
    value:{type: String, unique: true, default: "User"}
});

export default new model('Role', Role);