import { google } from "googleapis";
import { GraphQLError } from "graphql";
import { v4 as uuid } from "uuid";

import { SHEET_ID } from "./constants";
import { PersonWithImage, Resolvers } from "./types";

const ERROR_CODE_DATA_NOT_SET = "DATA_NOT_SET";
const ERROR_CODE_FILE_NOT_FOUND = "FILE_NOT_FOUND";

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"],
});
const sheets = google.sheets({ version: "v4", auth });
const drive = google.drive({ version: "v3", auth });

export const resolvers: Resolvers = {
  Query: {
    people: async () => {
      const result = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: "people!A2:A1000" });

      return result.data.values.map((row) => ({ id: uuid(), name: row[0] }));
    },
    todaysPerson: async (): Promise<PersonWithImage> => {
      try {
        // get row from daily_nose sheet
        const dailyRow = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: "daily_nose!A2:C2" });

        const row = dailyRow.data.values;
        if (!row) throw new GraphQLError("Daily nose not set", { extensions: { code: ERROR_CODE_DATA_NOT_SET } });

        // extract values
        const [name, noseImage, faceImage] = row[0];
        if (!name) throw new GraphQLError("Person not set", { extensions: { code: ERROR_CODE_DATA_NOT_SET } });
        if (!noseImage) throw new GraphQLError("Nose image not set", { extensions: { code: ERROR_CODE_DATA_NOT_SET } });
        if (!faceImage) throw new GraphQLError("Face image not set", { extensions: { code: ERROR_CODE_DATA_NOT_SET } });

        // get nose image file
        const noseFiles = await drive.files.list({ q: `name='${noseImage}'` });
        const noseFile = noseFiles.data.files[0];
        if (!noseFile)
          throw new GraphQLError("Nose image not found", { extensions: { code: ERROR_CODE_FILE_NOT_FOUND } });

        // get face image file
        const faceFiles = await drive.files.list({ q: `name='${faceImage}'` });
        const faceFile = faceFiles.data.files[0];
        if (!faceFile)
          throw new GraphQLError("Face image not found", { extensions: { code: ERROR_CODE_FILE_NOT_FOUND } });

        // return person with image
        return {
          id: uuid(),
          name,
          noseUrl: `https://drive.google.com/uc?export=view&id=${noseFile.id}`,
          faceUrl: `https://drive.google.com/uc?export=view&id=${faceFile.id}`,
        };
      } catch (err) {
        return err;
      }
    },
  },
};
