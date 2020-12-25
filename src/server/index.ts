import express from "express";
import path from "path";
import router from "./router";
import net from "net";
import store from '../store';

const getPort = (startPort: number, endPort: number): Promise<number> => {
    return new Promise((resolve) => {
        if (startPort > endPort) throw Error("Error: all ports already taken");

        const server = net.createServer((socket) => socket.write("Echo index"));
        server.listen(startPort);

        server.on("error", () => {
            getPort(startPort + 1, endPort).then(resolve);
        });
        server.on("listening", () => {
            server.close();
            resolve(startPort);
        });
    });
};

const index = async () => {
    const app = express();

    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        next();
    });

    router(app);

    app.use(express.static(path.join(__dirname, "../../public")));

    const port = await getPort(5000, 6000);
    store.port = port;
    app.listen(port, () => console.log("Server was started on port " + port));
};

export default index;
