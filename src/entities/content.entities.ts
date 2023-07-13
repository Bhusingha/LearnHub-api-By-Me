import { User } from "../entities/user.entities"

export interface Content {
    id: number;
    videoTitle: string;
    thumbnailUrl: string;
    creatorName: string;
    creatorUrl: string;
    postedBy: User;
    postedById: number
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateContent extends Content{
    videoUrl: string;
    comment: string;
    rating: number;
}

export interface UpdataContent extends Content{
    videoUrl: string;
    comment: string;
    rating: number;
    postedById: number
    updatedAt: Date;
}