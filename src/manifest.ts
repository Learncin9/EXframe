import ManifestType from "./../types/manifest";

export const manifest: ManifestType = {
    port: 8080,
    static: [
        {
            rest: "blog-post",
            dir: "blog",
        },
    ],
};
