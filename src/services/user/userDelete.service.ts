import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const userDeleteService = async (idReq: string, userIdWill: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const account = users.find((user) => user.id === idReq);
  if (account?.isAdm) {
    throw new Error("you are ADM ?");
  }

  let id = account?.isAdm ? userIdWill : idReq;

  const findUser = await userRepository.findOneBy({
    id,
  });

  if (!findUser) {
    return ["User not found", 404];
  }

  if (!findUser.isActive) {
    return ["User not Active", 400];
  }

  await userRepository.update(id, {
    isActive: false,
  });

  return "User Deleted";
};

export default userDeleteService;
