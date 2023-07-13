import { compareHash, hashPassword } from "../auth/bcrypt.auth";
import { Request, Response } from "express";
import { IRepositoryUser } from "../repositories/index.repo";
import { IHandlerUser } from "./index.handler";

export function newHandlerUser(repo: IRepositoryUser) {
    return new HandlerUser(repo);
}

class HandlerUser implements IHandlerUser {
    private readonly repo : IRepositoryUser;

    constructor(repo: IRepositoryUser) {
        this.repo = repo;
    }

    async register(req: Request, res: Response): Promise<Response> {
        const { username, name, password } = req.body;
        if (!username || !name || !password) {
            return res
              .status(400)
              .json({ error: "missing username, or name, or password in body" })
              .end();
          }
      
          try {
            const user = await this.repo.createUser({
              username,
              name,
              password: await hashPassword(password),
            });
      
            return res
              .status(201)
              .json({ ...user, password: undefined })
              .end();
          } catch (err) {
            const errMsg = `failed to create user: ${username}`;
            console.error({ error: `${errMsg}: ${err}` });
      
            return res.status(500).json({ error: errMsg }).end();
          }
        }
      
        async login(req: Request, res: Response): Promise<Response> {
          const { username, password } = req.body;
          if (!username || !password) {
            return res
              .status(400)
              .json({ error: "missing username or password in body" })
              .end();
          }
      
          try {
            const user = await this.repo.getUser(username);
            if (!user) {
              return res
                .status(404)
                .json({ error: `no such user: ${username}` })
                .end();
            }
      
            if (await compareHash(password, user.password)) {
              return res
                .status(401)
                .json({ error: `invalid username or password` })
                .end();
            }
      
            return res
              .status(200)
              .json({ status: `${username} logged in` })
              .end();
          } catch (err) {
            console.error({ error: `failed to get user ${err}` });
            return res.status(500).json({ error: `failed to login` }).end();
          }
    }

}