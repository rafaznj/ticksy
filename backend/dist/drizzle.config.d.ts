declare const _default: {
    schema: string;
    out: string;
    dialect: "postgresql";
    dbCredentials: {
        host: string;
        database: string;
        user: string | undefined;
        password: string | undefined;
        port: number;
    };
    verbose: true;
    strict: true;
};
export default _default;
