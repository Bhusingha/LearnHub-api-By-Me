import { JwtAuthRequest } from "../auth/jwt.auth";
import { Request, Response } from "express";


export type HandlerFunc = ( Request, Response ) => Promise<Response>

export type HandlerFuncAuth = ( JwtAuthRequest, Response ) => Promise<Response>

export interface IHandlerUser {
    register: HandlerFunc;
    login: HandlerFunc;
}

export interface IHandlerContent {
    createContent: HandlerFuncAuth;
    getContent: HandlerFuncAuth;
    getContentById: HandlerFuncAuth;
    deleteContent: HandlerFuncAuth;
}