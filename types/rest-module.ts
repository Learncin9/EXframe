import { Response, Request, NextFunction } from "express";
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
        console.log(
            "EXframe: all method should be 'get', 'post', 'put', 'patch', 'delete', 'all'"
        );
        process.exit();
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
