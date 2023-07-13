import { User, CreateUser } from "../entities/user.entities";
import { Content, CreateContent, UpdataContent } from "../entities/content.entities";

export interface IRepositoryContent {
    createContent(arg: CreateContent): Promise<Content>;
    getContentById(id: number): Promise<Content | null>;
    getUserContentById(arg: 
        { id: number; postedById: number }
        ): Promise<Content | null>;
    getContent(): Promise<Content[]>;
    getUserContent(postedById: number): Promise<Content[]>;
    deleteContentById(id: number): Promise<Content>;
    deleteUserContentById(arg: 
        { id: number; postedById: number }
        ): Promise<Content>;
    deleteContent(): Promise<void>;
    deleteUserContent(postedById: number): Promise<void>
    updateContent(arg: UpdataContent): Promise<Content>;
    updateUserContent(arg: UpdataContent): Promise<Content>;
}

export interface IRepositoryUser {
    createUser(user: CreateUser): Promise<User>;
    getUser(username: string): Promise<User>;
}