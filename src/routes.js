import { Router } from "express"
import { GetHome } from './controllers/get-home.js';
import { CreateUser } from './controllers/users/create-user.js';


const routes = Router();

routes.get("/", new GetHome().handle);
routes.post("/users", new CreateUser().handle );

export default routes;
