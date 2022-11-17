import ManifestType from "./../types/manifest";

export const manifest: ManifestType = {
    port: 3000,
    static: [
        {
            rest: "blog-post",
            dir: "blog",
        },
    ],
};
