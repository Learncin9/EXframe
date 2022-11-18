import { Express } from "express";
import express from "express";

import * as FileStream from "fs";
class FileList {
    #files = new Array(0);
    Build(path: string) {
        FileStream.readdirSync(path, {
            withFileTypes: true,
        }).forEach((file) => {
            if (file.isDirectory()) {
                this.Build(path + file.name + "/");
            } else {
                this.#files.push(path + file.name);
            }
        });
    }
    Get(): string[] {
        return this.#files;
    }
}

import {
    RestModuleType,
    DynamicImportingRestModuleType,
    MethodCheck,
    ResponseFunction,
} from "./types/rest-module";
import { manifest } from "./src/manifest";

const app: Express = express();

//read module as set app.get or ...
const moduleLink = process.cwd() + "/src/module/";

const moduleFileList = new FileList();
moduleFileList.Build(moduleLink);

const GetFileExtension = (text: string) => {
    const reverse = (str: string): string => {
        let reverse = str.split("");

        reverse = reverse.reverse();

        return reverse.join("");
    };
    let str = "";
    for (let i = text.length - 1; i >= 0; i--) {
        str += text[i];
        if (text[i] === ".") {
            break;
        }
    }

    return reverse(str);
};
const GetRestLink = (text: string): string => {
    return "/" + text.replace(moduleLink, "").replace(".js", "");
    //There can`t be any file without .js in src/module/ (if you`re using typescript, you ts and compile it by tsc)
};
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
            const restLink = GetRestLink(item);

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

//open server
setTimeout(() => {
    app.listen(manifest.port, () => {
        console.log(`EXframe: port opened by ${manifest.port}`);
    });
}, 2000);
