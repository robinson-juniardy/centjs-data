export interface IMssqlConfigProvider {
    user: string;
    password: string;
    database: string;
    server: string;
    pool: {
        max: number;
        min: number;
        idleTimeoutMillis: number;
    };
    options: {
        encrypt: boolean;
        trustServerCertificate: boolean;
    };
}
export interface IPgSQLConfigProvider {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
}
export interface IMySQLConfigProvider {
    host: string;
    user: string;
    password: string;
    database: string;
}
export declare enum DBProviders {
    sqlserver = "sqlserver",
    pgsql = "pgsql",
    mysql = "mysql"
}
export declare type DbContextProvider = {
    provider: "sqlserver";
    config: IMssqlConfigProvider;
} | {
    provider: "pgsql";
    config: IPgSQLConfigProvider;
} | {
    provider: "mysql";
    config: IMySQLConfigProvider;
};
export declare type TResultOptions = DbContextProvider["provider"];
//# sourceMappingURL=data.types.d.ts.map