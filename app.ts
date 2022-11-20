//#region import
import { Express } from "express";
import express from "express";

import GetFileExtension from "./lib/file-extensiob";
import GetRestLink from "./lib/rest-link";
import FileList from "./lib/file-list";

import globalMiddleware from "./src/middleware/global";
import errorMiddleware from "./src/middleware/error";

import {
    DynamicImportingRestModuleType,
    MethodCheck,
    ResponseFunction,
} from "./types/rest-module";
import { manifest } from "./src/manifest";
//#endregion

const app: Express = express();

//start setting global middleware (preload)
//#region
globalMiddleware.preload.map((item, index) => {
    console.log(`EXframe: global middleware(${index}) was seted! (preload)`);
    app.use(item);
});
//#endregion

//start serving src/module --> serve restApi
//#region

//read module as set app.get or ...
const moduleLink = process.cwd() + "/src/module/";

const moduleFileList = new FileList();
moduleFileList.Build(moduleLink);

const FixRest = (
    action: ResponseFunction,
    method: string,
    restLink: string
) => {
    switch (method) {
        case "get":
            app.get(restLink, action);
            break;
        case "post":
            app.post(restLink, action);
            break;
        case "put":
            app.put(restLink, action);
            break;
        case "patch":
            app.patch(restLink, action);
            break;
        case "delete":
            app.delete(restLink, action);
            break;
        case "all":
            app.use(restLink, action);
            break;
    }

    console.log(`EXframe: '${restLink}' was layered to restApi (${method})`);
};
moduleFileList.Get().map((item) => {
    if (GetFileExtension(item) === ".js") {
        //ts is translated by tsc, so as a result, it will read .js
        import(item).then((data: DynamicImportingRestModuleType) => {
            const module = data.default;
            const restLink = GetRestLink(item, moduleLink);

            //set pre middleware
            module.premid.map((item) => {
                MethodCheck(item.method);
                FixRest(item.action, item.method, restLink);
            });

            //set main middleware
            MethodCheck(module.main.method);
            FixRest(module.main.action, module.main.method, restLink);

            //set post middleware
            module.postmid.map((item) => {
                MethodCheck(item.method);
                FixRest(item.action, item.method, restLink);
            });
        });
    } else {
        if (GetFileExtension(item) !== ".ts") {
            //not .js and not .ts
            console.error(
                "\x1b[41m%s",
                "EXframe : There can`t be any file without .js in src/module/ (if you`re using typescript, use ts and compile it by tsc)"
            );
            process.exit();
        }
    }
});

//#endregion

//start serving static contents
//#region
if (manifest.static === null) {
    console.log(`EXframe: no static contents detected`);
} else {
    manifest.static.map((item) => {
        app.use("/" + item.rest, express.static("src/static/" + item.dir));

        console.log(
            `EXframe: 'src/static/${item.dir}' was served as static content at '/${item.rest}'`
        );
    });
}
//#endregion

//start setting global middleware (preload)
//#region
globalMiddleware.postload.map((item, index) => {
    console.log(`EXframe: global middleware(${index}) was seted! (postload)`);
    app.use(item);
});
//#endregion

//start setting error middleware
//#region
if (errorMiddleware.err404 !== null) {
    console.log(`EXframe: 404 error middleware was seted!`);
    app.use(errorMiddleware.err404);
} else {
    console.log(`EXframe: 404 error middleware wasnt seted!`);
}

if (errorMiddleware.others !== null) {
    console.log(`EXframe: other error middleware was seted!`);
    app.use(errorMiddleware.others);
} else {
    console.log(`EXframe: other error middleware wasnt seted!`);
}
//#endregion

//open server
setTimeout(() => {
    app.listen(manifest.port, () => {
        console.log(`EXframe: port opened by ${manifest.port}`);
    });
}, 2000);
