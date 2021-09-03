import express, { Express } from 'express';
import cors from 'cors';

import routes from './shared/infra/http/routes';

class App {
  server: Express;

  constructor() {
    this.server = express();
    this.server.use(cors());
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
