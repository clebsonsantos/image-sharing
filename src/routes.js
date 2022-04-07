import { Router } from "express"
import { GetHome } from './controllers/get-home.js';
import AuthUser from './controllers/users/auth-user.js';
import { CreateUser } from './controllers/users/create-user.js';
import { DeleteUser } from './controllers/users/delete-user.js';


const routes = Router();

routes.get("/", new GetHome().handle);
routes.post("/users", new CreateUser().handle );
routes.delete("/users/:email", new DeleteUser().handle );
routes.post("/auth", new AuthUser().handle );

export default routes;
