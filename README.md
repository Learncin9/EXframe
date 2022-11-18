# EX frame

## Project Init

First you need to download EXframe from github.

```
https://github.com/Learncin9/EXframe.git
```

and you should download some modules.

```
yarn add -D typescript
yarn add -D ts-node
yarn add -D expess
yarn add -D nodemon
yarn add -D @types/express
yarn add -D @types/node

or

yarn add -D typescript ts-node express nodemon @types/express @types/node
```

Lastly you need to init typescript by `tsc --init` and edit it like this.

```json
{
    "compilerOptions": {
        "target": "es2016",
        "module": "commonjs",
        "esModuleInterop": true,
        "strict": true,
        "skipLibCheck": true
    }
}
```

Now, you can use `.js` by using `tsc -w`

## Use rest api method

You can use rest api method by adding some files in `src/module`.

(almost everything you do will be at `src`)

Exframe will automactically import you .ts file and domaining it by directory layer.

```
src
  > module
    > some.ts

==> (your DNS)/some
```

```
src
  > module
    > pen
      > pineapple

==> (your DNS)/pen/pineapple
```

what that .ts file have to have goes as follows.

```ts
import {
    RestModuleType,
    Req,
    Res,
} from "./../../types/rest-module"; /*types/rest-module*/

const e: RestModuleType = {
    get: null,
    post: null,
    put: null,
    patch: null,
    delete: null,
};

export default e;
```

If you want to use GET you can do like this.

```ts
import {
    RestModuleType,
    Req,
    Res,
} from "./../../types/rest-module"; /*types/rest-module*/

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
```

If you used express.js you will know this.

```js
import express from "express";
const app = express();

app.use("/pen", (req, res) => {
    res.send("Hello, World!");
});

app.listen(8080);
```

In, here

```js
//express
(req, res) => {
    res.send("Hello, World!");
};
```

and

```ts
//EXframe
(req: Req, res: Res) => {
    res.send("Hello, World!");
};
```

is same at express.js and EXframe.
