import { RestModuleType, Req, Res } from "./../../../types/rest-module";

const e: RestModuleType = {
    action: (req: Req, res: Res) => {
        res.send("Hello, World!");
    },
    method: "GET",
};

export default e;
