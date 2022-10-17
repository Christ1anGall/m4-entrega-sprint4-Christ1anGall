import { Request, Response } from "express";
import userDeleteService from "../../services/user/userDelete.service";
import userUpdateService from "../../services/user/userUpdate.service";

const userDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idReq = id;
    const { userID } = req.body;

    const user = await userDeleteService(idReq, userID);

    if (typeof user === "string") {
      return res.status(204).json({ user });
    } else {
      return res.status(user[1] as number).json({ message: user[0] });
    }
  } catch (err) {
    if (err instanceof Error) {
      return res.status(403).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default userDeleteController;
