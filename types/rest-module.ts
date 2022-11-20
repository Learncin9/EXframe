import { Response, Request, NextFunction } from "express";
import Log from "./../src/log";

type ResponseFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => void;

type ResponseModuleType = {
    action: ResponseFunction;
    method: string;
};

type RestModuleType = {
    premid: ResponseModuleType[];
    main: ResponseModuleType;
    postmid: ResponseModuleType[];
};

type DynamicImportingRestModuleType = {
    default: RestModuleType;
};

function MethodCheck(method: string) {
    if (
        method !== "get" &&
        method !== "post" &&
        method !== "put" &&
        method !== "patch" &&
        method !== "delete" &&
        method !== "all"
    ) {
        Log.log(
            "EXframe: all method should be 'get', 'post', 'put', 'patch', 'delete', 'all'"
        );
    }
}

export {
    RestModuleType,
    DynamicImportingRestModuleType,
    ResponseFunction,
    ResponseModuleType,
    Request as Req,
    Response as Res,
    NextFunction as Next,
    MethodCheck,
};
