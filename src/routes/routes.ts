import { Router } from "express";
import userCreateController from "../controllers/users/userCreate.controller";
import userDeleteController from "../controllers/users/userDelete.controller";
import userListController from "../controllers/users/userList.controller";
import userLoginController from "../controllers/users/userLogin.controller";
import userUpdateController from "../controllers/users/userUpdate.controller";
import { isAdmUser } from "../middleware/isUserAdm.middleware";
import tokenMiddleware from "../middleware/tokenAuth.middleware";

const routes = Router();

routes.post("/users", userCreateController);
routes.get("/users", isAdmUser, userListController);
routes.patch("/users/:id", tokenMiddleware, userUpdateController);
routes.delete("/users/:id", isAdmUser, userDeleteController);
routes.post("/login", userLoginController);

export default routes;
