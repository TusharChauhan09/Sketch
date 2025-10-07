import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route";
import roomRouter from "./routes/room.route";

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/auth',authRouter);

app.use('/api/room',roomRouter);

app.listen(3001, () => {
    console.log(`App is listening on port ${3001}`);
});


