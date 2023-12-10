"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const googleapis_1 = require("googleapis");
const graphql_1 = require("graphql");
const uuid_1 = require("uuid");
const constants_1 = require("./constants");
const ERROR_CODE_DATA_NOT_SET = "DATA_NOT_SET";
const ERROR_CODE_FILE_NOT_FOUND = "FILE_NOT_FOUND";
const auth = new googleapis_1.google.auth.GoogleAuth({
    credentials: {
        type: constants_1.CREDENTIAL_TYPE,
        project_id: constants_1.CREDENTIAL_PROJECT_ID,
        private_key: constants_1.CREDENTIAL_PRIVATE_KEY,
        client_email: constants_1.CREDENTIAL_CLIENT_EMAIL,
        client_id: constants_1.CREDENTIAL_CLIENT_ID,
        universe_domain: constants_1.CREDENTIAL_UNIVERSE_DOMAIN,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"],
});
const sheets = googleapis_1.google.sheets({ version: "v4", auth });
const drive = googleapis_1.google.drive({ version: "v3", auth });
exports.resolvers = {
    Query: {
        people: async () => {
            const result = await sheets.spreadsheets.values.get({ spreadsheetId: constants_1.SHEET_ID, range: "people!A2:A1000" });
            return result.data.values.map((row) => ({ id: (0, uuid_1.v4)(), name: row[0] }));
        },
        todaysPerson: async () => {
            try {
                // get row from daily_nose sheet
                const dailyRow = await sheets.spreadsheets.values.get({ spreadsheetId: constants_1.SHEET_ID, range: "daily_nose!A2:C2" });
                const row = dailyRow.data.values;
                if (!row)
                    throw new graphql_1.GraphQLError("Daily nose not set", { extensions: { code: ERROR_CODE_DATA_NOT_SET } });
                // extract values
                const [name, noseImage, faceImage] = row[0];
                if (!name)
                    throw new graphql_1.GraphQLError("Person not set", { extensions: { code: ERROR_CODE_DATA_NOT_SET } });
                if (!noseImage)
                    throw new graphql_1.GraphQLError("Nose image not set", { extensions: { code: ERROR_CODE_DATA_NOT_SET } });
                if (!faceImage)
                    throw new graphql_1.GraphQLError("Face image not set", { extensions: { code: ERROR_CODE_DATA_NOT_SET } });
                // get nose image file
                const noseFiles = await drive.files.list({ q: `name='${noseImage}'` });
                const noseFile = noseFiles.data.files[0];
                if (!noseFile)
                    throw new graphql_1.GraphQLError("Nose image not found", { extensions: { code: ERROR_CODE_FILE_NOT_FOUND } });
                // get face image file
                const faceFiles = await drive.files.list({ q: `name='${faceImage}'` });
                const faceFile = faceFiles.data.files[0];
                if (!faceFile)
                    throw new graphql_1.GraphQLError("Face image not found", { extensions: { code: ERROR_CODE_FILE_NOT_FOUND } });
                // return person with image
                return {
                    id: (0, uuid_1.v4)(),
                    name,
                    noseUrl: `https://drive.google.com/uc?export=view&id=${noseFile.id}`,
                    faceUrl: `https://drive.google.com/uc?export=view&id=${faceFile.id}`,
                };
            }
            catch (err) {
                return err;
            }
        },
    },
};
