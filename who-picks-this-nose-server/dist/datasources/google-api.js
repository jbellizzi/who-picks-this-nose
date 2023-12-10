"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAPI = void 0;
const googleapis_1 = require("googleapis");
const graphql_1 = require("graphql");
const ERROR_CODE_FILE_NOT_FOUND = "FILE_NOT_FOUND";
class GoogleAPI {
    constructor({ credentials, cache }) {
        this.auth = new googleapis_1.google.auth.GoogleAuth({
            credentials,
            scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"],
        });
        this.sheets = googleapis_1.google.sheets({ version: "v4", auth: this.auth });
        this.drive = googleapis_1.google.drive({ version: "v3", auth: this.auth });
        this.cache = cache;
    }
    async getSpreadsheetValues({ spreadsheetId, sheetName, range, }) {
        const result = await this.sheets.spreadsheets.values.get({ spreadsheetId, range: `${sheetName}!${range}` });
        return result.data.values;
    }
    async getDriveFile(name) {
        const files = await this.drive.files.list({ q: `name='${name}'` });
        const file = files.data.files[0];
        if (!file)
            throw new graphql_1.GraphQLError("File not found", { extensions: { code: ERROR_CODE_FILE_NOT_FOUND } });
        return file;
    }
    async getDriveImageUrl(name) {
        console.log(this.cache);
        const key = `drive-image-${name}`;
        const cacheVal = await this.cache?.get(key);
        if (cacheVal)
            return cacheVal;
        const file = await this.getDriveFile(name);
        const url = `https://drive.google.com/uc?export=view&id=${file.id}`;
        this.cache.set(key, url);
        return url;
    }
}
exports.GoogleAPI = GoogleAPI;
