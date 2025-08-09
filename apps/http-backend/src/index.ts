import express from "express";
import authRouter from "./routes/auth.route";
import rooomRouter from "./routes/room.route";

const app = express();

app.use(express.json());

app.use('/api/auth',authRouter);

app.use('/api/room',rooomRouter);

app.listen(3001, () => {
    console.log(`App is listening on port ${3001}`);
});


