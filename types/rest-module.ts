import { Response, Request } from "express";
type ResponseFunction = (req: Request, res: Response) => void;
type ResponseMethodAction = ResponseFunction | null;

type RestModuleType = {
    get: ResponseMethodAction;
    post: ResponseMethodAction;
    put: ResponseMethodAction;
    patch: ResponseMethodAction;
    delete: ResponseMethodAction;
};

type DynamicImportingRestModuleType = {
    default: RestModuleType;
};

export {
    RestModuleType,
    DynamicImportingRestModuleType,
    ResponseFunction,
    Request as Req,
    Response as Res,
};
