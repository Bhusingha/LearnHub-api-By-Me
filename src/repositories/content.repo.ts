import { PrismaClient } from ".prisma/client";
import { IRepositoryContent } from "./index.repo";
import { Content, CreateContent, UpdataContent } from "../entities/content.entities";

export function newRepoitoryContent(db: PrismaClient): IRepositoryContent {
    return new RepositoryContent(db);
}

class RepositoryContent implements IRepositoryContent {
    private db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    async createContent(arg: CreateContent): Promise<Content> {
        return this.db.content.create({
            data: {
                videoUrl: arg.videoUrl,
                comment: arg.comment,
                rating: arg.rating,
            },
        });
    }

    async getContentById(id: number): Promise<Content | null> {
        return await this.db.content.findUnique({
            where: {
                id,
            },
        });
    }

    async getUserContentById(where: { id: number; postedById: number; }): Promise<Content | null> {
        return await this.db.content.findFirst({
            where,
        });
    }

    async getContent(): Promise<Content[]> {
        return await this.db.content.findMany();
    }

    async getUserContent(postedById: number): Promise<Content[]> {
        return this.db.content.findMany({
            where: {
                postedById,
            },
        });
    }

    async deleteContentById(id: number): Promise<Content> {
        return await this.db.content.delete({
            where: { id },
        });
    }

    async deleteUserContentById(arg: { 
        id: number; postedById: number; 
        }): Promise<Content> {
        const content = await this.db.content.findFirst({
            where: { id: arg.id, postById: arg.id}
        });

        if (!content) {
            return Promise.reject(`no such todo: ${arg.id}`);
        }

        return await this.db.content.delete({
            where: { id: arg.id }
        });
    }

    async deleteContent(): Promise<void> {
        await this.db.content.deleteMany();
    }

    async deleteUserContent(postedById: number): Promise<void> {
        await this.db.content.deleteMany({
            where: { postedById }
        });
    }

    async updateContent(arg: UpdataContent): Promise<Content> {
        return await this.db.todo.update({
            where: { id: arg.id },
            data: {
                videoUrl: arg.videoUrl,
                comment: arg.comment,
                rating: arg.rating,
                updatedAt: arg.updatedAt,
            },
        });
    }

    async updateUserContent(arg: UpdataContent): Promise<Content> {
        const content = await this.db.content.findUnique({
            where: { id: arg.id }
        });

        if (!content) {
            return Promise.reject(`no such content ${arg.id}`)
        }

        if (content.postById !== arg.postedById) {
            return Promise.reject(`bad postById: ${arg.postedById}`)
        }

        return await this.db.content.update({
            where: { id: arg.id },
            data: {
                videoUrl: arg.videoUrl,
                comment: arg.comment,
                rating: arg.rating,
                updatedAt: arg.updatedAt, 
            },
        });
    }
}