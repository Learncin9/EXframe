type StaticContentDirectoryElement = { rest: string; dir: string };

type ManifestType = {
    port: number;
    static: StaticContentDirectoryElement[] | null;
};

export default ManifestType;
