import { hash, hashSync } from "bcrypt";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const userUpdateService = async (
  idReq: string,
  name: string,
  email: string,
  password: string,
  userIdWill: string
) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const account = users.find((user) => user.email === email);

  let id = account?.isAdm ? userIdWill : idReq;

  if (!account?.isAdm) {
    if (userIdWill) {
      return ["not be able to update another user without adm permission", 400];
    }
  }
  const findUser = await userRepository.findOneBy({
    id,
  });

  if (!findUser) {
    return ["User not found", 404];
  }

  await userRepository.update(id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    password: password ? hashSync(password, 10) : findUser.password,
    updatedAt: new Date(),
  });

  const user = await userRepository.findOneBy({
    id,
  });

  return user!;
};

export default userUpdateService;
