import { PrismaClient } from "@prisma/client"
import { User, CreateUser } from "../entities/user.entities";
import { IRepositoryUser } from "./index.repo";

export function newRepoitoryUser(db: PrismaClient): IRepositoryUser {
    return new RepositoryUser(db);
}

class RepositoryUser implements IRepositoryUser{
    private db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    async createUser(user: CreateUser): Promise<User> {
        return await this.db.user
        .create({ data: user })
        .catch((err) => 
        Promise.reject(`failed to create user ${user.username}: ${err}`),
        );
    }

    async getUser(username: string): Promise<User> {
        return await this.db.user
        .findUnique({ where: {username} })
        .then((user) => {
            if (!user) {
                return Promise.reject(`no such user ${username}`);
            }
            return Promise.resolve(user);
        });
    }
 }