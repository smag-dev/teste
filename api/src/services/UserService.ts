import UserModel from "../model/UserModel";
import bcrypt from "bcrypt";
import TokenService from "./TokenService";

interface IUserData {
  email: string;
  password: string;
}

class UserService {
  async create(user: IUserData) {
    const { email, password } = user;
    /* validar se a conta exise */
    const existUser = await UserModel.findOne({ email: email });
    if (existUser) {
      throw new Error("User já existe.");
    }

    /* encriptar password */
    const passwordencrypted = await bcrypt.hash(password, 7);
    /* contruir new user mas com password encriptada*/
    const newUser = { email, password: passwordencrypted };
    const newUserDb = await UserModel.create(newUser);
    /* gerar o token para o caso de ao registar, entrar logo na conta */
    const token = TokenService.generateToken(newUserDb);
    return { ...token, newUserDb };
  }

  async login(user: IUserData) {
    const { email, password } = user;
    /*validar se a conta existe*/
    const existUser = await UserModel.findOne({ email });

    if (!existUser) {
      throw new Error("User não existe!");
    }

    /* verificar se a password é valida */
    const validPassword = bcrypt.compareSync(password, existUser.password);
    if (!validPassword) {
      throw new Error("Password invalida.");
    }
    const passwordencrypted = await bcrypt.hash(password, 7);
    /* entrou então atualizar o campo lastLogin */
    let newUser = await UserModel.findOneAndUpdate(
      { email: email },
      { lastLogin: Date.now() }
    );
    /* gerar token e enviar para o user */
    const tokens = TokenService.generateToken(existUser);
    return { ...tokens, existUser };
  }

  async getAll() {
    const users = await UserModel.find();
    return users;
  }

  async getOne(id: string) {
    const user = await UserModel.findById(id);
    return user;
  }
}

export default new UserService();
