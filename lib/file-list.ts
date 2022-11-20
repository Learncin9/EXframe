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

export default FileList;
