import { Res, ResponseFunction } from "./rest-module";
type Type = {
    preload: ResponseFunction[];
    postload: ResponseFunction[];
};

export default Type;
