import { ApolloServer } from "@apollo/server";
import { GoogleAuth } from "google-auth-library";
import { GoogleAuthOptions, JSONClient } from "google-auth-library/build/src/auth/googleauth";
import { drive_v3, google, sheets_v4 } from "googleapis";
import { GraphQLError } from "graphql";

const ERROR_CODE_FILE_NOT_FOUND = "FILE_NOT_FOUND";

interface GetSpreadsheetValuesProps {
  spreadsheetId: string;
  sheetName: string;
  range: string;
}

interface GoogleAPIProps {
  credentials: GoogleAuthOptions["credentials"];
  cache?: ApolloServer["cache"];
}

export class GoogleAPI {
  auth: GoogleAuth<JSONClient>;
  sheets: sheets_v4.Sheets;
  drive: drive_v3.Drive;
  cache: ApolloServer["cache"];

  constructor({ credentials, cache }: GoogleAPIProps) {
    this.auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"],
    });
    this.sheets = google.sheets({ version: "v4", auth: this.auth });
    this.drive = google.drive({ version: "v3", auth: this.auth });
    this.cache = cache;
  }

  async getSpreadsheetValues<T = never>({
    spreadsheetId,
    sheetName,
    range,
  }: GetSpreadsheetValuesProps): Promise<T[][]> {
    const result = await this.sheets.spreadsheets.values.get({ spreadsheetId, range: `${sheetName}!${range}` });
    return result.data.values;
  }

  async getDriveFile(name: string) {
    const files = await this.drive.files.list({ q: `name='${name}'` });
    const file = files.data.files[0];
    if (!file) throw new GraphQLError("File not found", { extensions: { code: ERROR_CODE_FILE_NOT_FOUND } });

    return file;
  }

  async getDriveImageUrl(name: string) {
    const key = `drive-image-${name}`;
    const cacheVal = await this.cache?.get(key);
    if (cacheVal) return cacheVal;

    const file = await this.getDriveFile(name);

    const url = `https://drive.google.com/uc?export=view&id=${file.id}`;
    this.cache.set(key, url);
    return url;
  }
}
