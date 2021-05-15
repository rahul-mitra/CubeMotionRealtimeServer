import mongoose from 'mongoose';
import { IUserBase } from './UserSchema';

export interface IMessage extends mongoose.Document{
    user: IUserBase;
    message: string;
    hasAttachment: boolean;
    attachment: any;
    roomID:string;
    time:Date;
    usersList: Array<IUserBase>;
}

export const MessageSchema = new mongoose.Schema({
    user: {type:Object,required:true},
    message: {type:String,required:true},
    roomID: {type:String,required:true},
    usersList:{type:Array,required:true},
    time:{type:Date,required:true},
    hasAttachment: Boolean,
    attachment: Object
});

export const MessageModel = mongoose.model<IMessage>("messages",MessageSchema,"messages");