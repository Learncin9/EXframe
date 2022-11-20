const GetRestLink = (text: string, subedText: string): string => {
    return "/" + text.replace(subedText, "").replace(".js", "");
    //There can`t be any file without .js in src/module/ (if you`re using typescript, you ts and compile it by tsc)
};

export default GetRestLink;
