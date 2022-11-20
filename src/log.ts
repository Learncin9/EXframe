import LogModule from "./../types/log-module";

const l: LogModule = {
    log: (text: string) => console.log("\x1b[37m%s", "EXframe: " + text),
    warn: (text: string) => console.warn("\x1b[33m%s", "EXframe: " + text),
    error: (text: string) => {
        console.error("\x1b[31m%s", "EXframe: " + text);
        process.exit();
    },
};

export default l;
