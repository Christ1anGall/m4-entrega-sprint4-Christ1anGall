import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/users";

const userLoginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const account = users.find((user) => user.email === email);

  if (!account) {
    throw new Error("User not found");
  }

  if (!bcrypt.compareSync(password, account.password)) {
    throw new Error("wrong email/password");
  }

  const token = jwt.sign(
    { email: email, isAdm: account.isAdm },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
    }
  );

  return token;
};
export default userLoginService;
