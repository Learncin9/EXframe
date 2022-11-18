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
} from "./types/rest-module";
import { manifest } from "./src/manifest";
import { createImportSpecifier } from "typescript";

const app: Express = express();

//read module as set app.get or ...
const moduleLink = process.cwd() + "/src/module/";

const moduleFileList = new FileList();
moduleFileList.Build(moduleLink);

const reverse = (str: string): string => {
    let reverse = str.split("");

    reverse = reverse.reverse();

    return reverse.join("");
};
const GetFileExtension = (text: string) => {
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
const RestModule = (module: RestModuleType, restLink: string) => {
    if (module.get !== null) {
        app.get(restLink, module.get);
        console.log(`EXframe: '${restLink}'(get) was rested as GET`);
    }

    if (module.post !== null) {
        app.post(restLink, module.post);
        console.log(`EXframe: '${restLink}'(post) was rested as POST`);
    }

    if (module.put !== null) {
        app.get(restLink, module.put);
        console.log(`EXframe: '${restLink}'(put) was rested as PUT`);
    }

    if (module.patch !== null) {
        app.get(restLink, module.patch);
        console.log(`EXframe: '${restLink}'(patch) was rested as PATCH`);
    }

    if (module.delete !== null) {
        app.get(restLink, module.delete);
        console.log(`EXframe: '${restLink}'(delete) was rested as DELETE`);
    }
};
moduleFileList.Get().map((item) => {
    if (GetFileExtension(item) === ".js") {
        //ts is translated by tsc, so as a result, it will read .js
        import(item).then((data: DynamicImportingRestModuleType) => {
            RestModule(data.default, GetRestLink(item));
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
