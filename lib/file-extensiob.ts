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

export default GetFileExtension;
