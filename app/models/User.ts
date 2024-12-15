import { Schema } from 'inspector/promises'
import mongoose from 'mongoose'

export interface IUser extends Document{
    id: number,
    name: string;
    age: umber,
}

const userSchema = new mongoose.Schema({
    id:{ type:Number},
    name:{type: String},
    age:{type:Number},

})

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User