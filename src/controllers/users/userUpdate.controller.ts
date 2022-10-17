import { Request, Response } from "express";
import userUpdateService from "../../services/user/userUpdate.service";

const userUpdateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idReq = id;
    const { name, email, password, userID } = req.body;

    const user = await userUpdateService(idReq, name, email, password, userID);

    if (Object.keys(req.body).includes("isAdm")) {
      return res
        .status(401)
        .json({ message: "don't try to update isAdm field!" });
    }
    if (Object.keys(req.body).includes("isActive")) {
      return res.status(401).json({
        message: "don't try to update isActive field!",
      });
    }

    if (Object.keys(req.body).includes("id")) {
      return res.status(401).json({
        message: "don't try to update id field!",
      });
    }

    return res.status(200).json({ message: "User updated!" });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default userUpdateController;
