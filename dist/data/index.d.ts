import { DbContextProvider } from "./data.types";
import mssql from "mssql";
export default class Database {
    protected _connection: DbContextProvider;
    protected _query: string;
    protected _result: Array<any> | any;
    constructor(dbConnection: DbContextProvider);
    Execute<CentORM extends string>(query: CentORM | string): this;
    Results(withApiContext?: boolean, apiCustomMessage?: {
        onSuccess?: string;
        onFailed?: string;
        onNotFoundRow?: string;
    }): Promise<mssql.IRecordSet<any> | {
        status: number;
        message: string[];
        data: mssql.IRecordSet<any>;
    } | {
        status: boolean;
        message: string[];
        data: any;
    }>;
}
//# sourceMappingURL=index.d.ts.map