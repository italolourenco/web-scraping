// import express from 'express'
// import routes from './routes'


// const app = express()

// app.use(routes)

// const server = app.listen('3000', function() {
//     console.log(`Example app listening`);
// })

// server.timeout = 1000 * 60 * 10

import express, { Application, Request, Response, NextFunction } from 'express';
import http from 'http'
import pino from 'pino'
import expressPino from 'express-pino-logger'

import routes from './routes'

const logger = pino({
    level: process.env.VERBOSE ? 'debug' : 'info'
});


class Server {
    public app: Application
    public server: http.Server

    constructor(){
        this.app = express()
        this.config()
        this.routes()
    }

    public static start(): Server {
        return new Server()
    }

    private config() {
        this.app.use(express.json());
        this.app.use(expressPino({ logger }))

        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            err.status = 404;
            next(err);
        });

        const port = process.env.PORT || 5000;
        this.app.set('port', port);
        this.server = this.app.listen(port, () => {
            logger.info('Express Router is running on port', port);
        });

        this.server.timeout = 1000 * 60 * 60
    }

    private routes() {
        this.app.use(routes)
    }
}

export default Server.start()