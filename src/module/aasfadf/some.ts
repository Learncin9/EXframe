import { RestModuleType, Req, Res } from "./../../../types/rest-module";

const e: RestModuleType = {
    get: (req: Req, res: Res) => {
        res.send("Hello, World!");
    },
    post: null,
    put: null,
    patch: null,
    delete: null,
};

export default e;
