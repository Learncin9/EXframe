import { Response, Request, NextFunction, ErrorRequestHandler } from "express";
import { ResponseFunction } from "./rest-module";

type ErrorResponseFunction = (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
) => void;

type Type = {
    err404: ResponseFunction | null;
    others: ErrorResponseFunction | null;
};
export default Type;
