import { Express } from "express";
import express from "express";

import { manifest } from "./src/manifest";

const app: Express = express();

//start serving static contents
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

//open server
app.listen(manifest.port, () => {
    console.log(`EXframe: port opened by ${manifest.port}`);
});
