import { Response, Request } from "express";
type ResponseFunction = (req: Request, res: Response) => void;

type RestModuleType = {
    action: ResponseFunction;
    method: string;
};

type DynamicImportingRestModuleType = {
    default: RestModuleType;
};

const CheckMethod = (text: string) => {
    let ok = false;

    if (text === "GET") {
        ok = true;
    }

    if (text === "POST") {
        ok = true;
    }

    if (text === "PUT") {
        ok = true;
    }

    if (text === "PATCH") {
        ok = true;
    }

    if (text === "DELETE") {
        ok = true;
    }

    if (ok === false) {
        console.error(
            "\x1b[41m%s",
            "EXframe : module`s method have to be 'GET', 'POST', 'PUT', 'PATCH', 'DELETE' (not small case)"
        );
        process.exit();
    }
};

export {
    RestModuleType,
    DynamicImportingRestModuleType,
    ResponseFunction,
    Request as Req,
    Response as Res,
    CheckMethod,
};
