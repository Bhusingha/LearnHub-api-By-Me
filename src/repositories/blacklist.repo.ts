import { RedisClientType } from "redis"

const keyBlacklist = "LearnHub-ProMax"

export interface IRepositoryBlacklist {
    addToBlacklist(token: string): Promise<void>;
    isBlacklisted(token: string): Promise<boolean>;
}

export function newRepoitoryBlacklist (db: RedisClientType): IRepositoryBlacklist {
    return new RepositoryBlacklist(db);
}

class RepositoryBlacklist {
    private db: RedisClientType;

    constructor(db: RedisClientType) {
        this.db = db;
    }

    async addToBlacklist(token: string): Promise<void> {
        await this.db.sAdd(keyBlacklist, token);
    }

    async isBlacklisted(token: string): Promise<boolean> {
        return await this.db.sIsMember(keyBlacklist, token);
    }
}