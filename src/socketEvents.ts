import express from 'express';
import { Socket, ServerOptions } from 'socket.io';
import http from 'http';
import SocketIO from 'socket.io';
import { CorsOptions } from 'cors';
import cors from 'cors';
// export class ExtendedMessage {
//     message: IMessage;
//     usersList: Array<IUser>;
//     constructor(message: IMessage,
//         usersList: Array<IUser>) {
//         this.message = message; this.usersList = usersList
//     }
// }

class SocketHandler {
    IO: SocketIO.Server;


    constructor(httpServer: http.Server, socketOptions: any) {
        this.IO = new SocketIO.Server(httpServer, socketOptions)
        this.startSocketServer();
        console.log("Socket Initialized")
    }





    public startSocketServer() {

        // this.IO.use(async (socket, next) => {  
        //     // await socket.join("cuberoom")
        //     next();
        // });
        this.IO.on("connection", async socket => {
           console.log("Socket connected ",socket.id);
            this.IO.to(socket.id).emit("serverMessage", "Connected to server!");
  
            socket.on("disconnect", (reason) => {
                console.log("Client disconnected |%s| reason |%s|", socket.id, reason);
            });
            socket.on("joinRoom",async (roomID:string)=>{
                console.log("Join room ",roomID);
                await socket.join(roomID);
                this.IO.to(socket.id).emit("serverMessage","Joined room "+roomID);
            });
            socket.on("emitAxisX",(x:number,roomID:string)=>{
                // console.log(axis);
                socket.broadcast.to(roomID).emit("emitAxisX",x);
            })
            socket.on("emitAxisY",(y:number,roomID:string)=>{
                // console.log(axis);
                socket.broadcast.to(roomID).emit("emitAxisY",y);
            })
            socket.on("emitAxisZ",(z:number,roomID:string)=>{
                // console.log(axis);
                socket.broadcast.to(roomID).emit("emitAxisZ",z);
            })
            socket.on("emitColor",(colorCode:Array<string>,roomID:string)=>{
                // console.log("Emitting color code [%s] in room [%s]",colorCode,roomID);
                // console.log("Size of color object ",Buffer.byteLength(colorCode.toString(), 'utf8') + " bytes");
                socket.broadcast.to(roomID).emit("emitColor",colorCode);
            })
            
        });
    }

}

export default SocketHandler;