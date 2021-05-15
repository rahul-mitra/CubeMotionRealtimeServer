
import express, { request } from 'express';
import { Socket, ServerOptions } from 'socket.io';
import http from 'http';
import SocketIO from 'socket.io';

import { CorsOptions } from 'cors';
import cors from 'cors';

import SocketHandler from './socketEvents';

const port: any = 5000;
const host = "0.0.0.0";
const SocketOptions: ServerOptions | any = {
    transports: ["websocket"],
    allowUpgrades: false
}
const options: CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token'
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: "*",
    preflightContinue: false,
};




const app = express();
app.use(cors(options))
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: 1024 * 1024, type: "*" }));
const server = http.createServer(app);
// const io:SocketIO.Server = new SocketIO.Server(server,SocketOptions)
let sockethandler = new SocketHandler(server, SocketOptions);
// let conn: mongoose.Connection;
// sockethandler.startSocketServer(DBconnectionString).then((con) => conn = con).catch(reason => { console.debug(reason) });
// console.log(conn);
// conn.MongooseConnection.model("users").find({}).then(doc => {
//     console.log(doc)
// }).catch(err => {
//     console.debug(err);
// });
app.get('/', (req, res) => {
    res.send(['Invalid Data']);
});


server.listen(process.env.PORT || port, () => {

    console.log(`server is listening on port ${port}`);
});