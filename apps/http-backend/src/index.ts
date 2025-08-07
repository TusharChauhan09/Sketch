import express from "express";
import authRouter from "./routes/auth.route";
import rooomRouter from "./routes/room.route";

const app = express();

app.use('/api/auth',authRouter);

app.use('/api/auth',rooomRouter);

app.listen(3000, () => {
    console.log(`App is listening on port ${3000}`);
});


