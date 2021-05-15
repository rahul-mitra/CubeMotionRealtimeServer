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

        this.IO.use(async (socket, next) => {  
            await socket.join("cuberoom")
            next();
        });
        this.IO.on("connection", async socket => {
           console.log("Socket connected ",socket.id);
            this.IO.to(socket.id).emit("serverMessage", "Connected to server!");
  
            socket.on("disconnect", (reason) => {
                console.log("Client disconnected |%s| reason |%s|", socket.id, reason);
            });
            socket.on("testServer", (data) => {
                console.log("Client sent data on test server ", data);
                this.IO.to(socket.id).emit("testServer", "Thanks for sending data have it back now " + data);
            });
            socket.on("emitAxis",(axis:{x:number,y:number,z:number})=>{
                // console.log(axis);
                socket.broadcast.emit("emitAxis",axis);
            })
            socket.on("emitColor",(colorCode:string)=>{
                console.log("Emitting color code ",colorCode);
                socket.broadcast.emit("emitColor",colorCode);
            })
            
        });
    }

}

export default SocketHandler;