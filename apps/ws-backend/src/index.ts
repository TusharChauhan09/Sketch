import { JWT_SECRET } from '@repo/backend-common/config';
import { WebSocketServer } from "ws";
import { parse } from 'url';
import jwt, { JwtPayload }  from "jsonwebtoken";


const wss =  new WebSocketServer({port:3002});

wss.on('connection', function connection(ws,req){

    // const parsedUrl = parse(req.url || '', true);  // true = parse query as object
    // const query = parsedUrl.query;
    // const token = query.token;

    const url = req.url;
    if(!url) return;
    const query = new URLSearchParams(url.split('?')[1]);
    const token = query.get('token') ?? "";

    const decode = jwt.verify(token,JWT_SECRET);

    if(!decode || !(decode as JwtPayload).userId){
        ws.close;
        return;
    }
  
    console.log('with token:', token);


    ws.on('message',function message(data){
        ws.send('pong');
    });
});