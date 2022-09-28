import {
  DbContextProvider,
  IMySQLConfigProvider,
  TResultOptions,
} from "./data.types";
import mysql from "mysql";
import mssql from "mssql";

export default class Database {
  protected _connection: DbContextProvider;
  protected _query: string;
  protected _result: Array<any> | any;

  constructor(dbConnection: DbContextProvider) {
    this._connection = dbConnection;
    this._query;
    this._result;
  }

  public Execute<CentORM extends string>(query: CentORM | string) {
    this._query = query as string;
    return this;
  }

  public async Results(
    withApiContext: boolean = false,
    apiCustomMessage?: {
      onSuccess?: string;
      onFailed?: string;
      onNotFoundRow?: string;
    }
  ) {
    if (this._connection.provider === "mysql") {
      mysql
        .createConnection(this._connection.config)
        .query(this._query, (error, results, fields) => {
          if (withApiContext) {
            if (error) {
              console.error(error.stack);
              return {
                status: false,
                message: apiCustomMessage.onFailed
                  ? apiCustomMessage.onFailed
                  : error.stack,
                data: null,
              };
            } else {
              if (results.length > 0) {
                return {
                  status: true,
                  message: apiCustomMessage.onSuccess
                    ? apiCustomMessage.onSuccess
                    : "success",
                  data: results,
                };
              } else {
                return {
                  status: true,
                  message: apiCustomMessage.onNotFoundRow
                    ? apiCustomMessage.onNotFoundRow
                    : "data not found",
                  data: [],
                };
              }
            }
          } else {
            return results;
          }
        });
    }

    if (this._connection.provider === "sqlserver") {
      return mssql
        .connect(this._connection.config)
        .then((pool) => {
          return pool.request().query(this._query);
        })
        .then((result) => {
          if (withApiContext) {
            return {
              status: 1,
              message:
                result.recordset.length > 0
                  ? [
                      apiCustomMessage?.onSuccess
                        ? apiCustomMessage.onSuccess
                        : "success",
                    ]
                  : [
                      apiCustomMessage?.onNotFoundRow
                        ? apiCustomMessage.onNotFoundRow
                        : "data not found",
                    ],
              data: result.recordset?.length > 0 ? result.recordset : null,
            };
          } else {
            return result.recordset;
          }
        })
        .catch((error) => {
          console.error(error);
          if (withApiContext) {
            return {
              status: false,
              message: [
                apiCustomMessage?.onFailed
                  ? apiCustomMessage?.onFailed
                  : "db service unavailable, connection crash",
              ],
              data: null,
            };
          } else {
            return null;
          }
        });
    }
    if (this._connection.provider === "pgsql") {
    }
  }
}
