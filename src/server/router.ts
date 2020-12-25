import { Application } from "express";

const router = (app: Application) => {
    app.get("/hi", (req, res) => {
        res.send("hi").status(200);
    });
};

export default router;
