"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const graphql_1 = require("graphql");
const uuid_1 = require("uuid");
const constants_1 = require("./constants");
const ERROR_CODE_DATA_NOT_SET = "DATA_NOT_SET";
exports.resolvers = {
    Query: {
        people: async (_, __, { dataSources }) => {
            const values = await dataSources.googleApi.getSpreadsheetValues({
                spreadsheetId: constants_1.SHEET_ID,
                sheetName: "people",
                range: "A2:A1000",
            });
            return values.map((row) => ({ id: (0, uuid_1.v4)(), name: row[0] }));
        },
        todaysPerson: async (_, __, { dataSources }) => {
            try {
                // get row from daily_nose sheet
                const dailyRow = await dataSources.googleApi.getSpreadsheetValues({
                    spreadsheetId: constants_1.SHEET_ID,
                    sheetName: "daily_nose",
                    range: "A2:C2",
                });
                if (!dailyRow)
                    throw new graphql_1.GraphQLError("Daily nose not set", { extensions: { code: ERROR_CODE_DATA_NOT_SET } });
                // extract values
                const [name, noseImage, faceImage] = dailyRow[0];
                if (!name)
                    throw new graphql_1.GraphQLError("Person not set", { extensions: { code: ERROR_CODE_DATA_NOT_SET } });
                if (!noseImage)
                    throw new graphql_1.GraphQLError("Nose image not set", { extensions: { code: ERROR_CODE_DATA_NOT_SET } });
                if (!faceImage)
                    throw new graphql_1.GraphQLError("Face image not set", { extensions: { code: ERROR_CODE_DATA_NOT_SET } });
                // get nose image file
                const noseImageUrl = await dataSources.googleApi.getDriveImageUrl(noseImage);
                // get face image file
                const faceImageUrl = await dataSources.googleApi.getDriveImageUrl(faceImage);
                // return person with image
                return { id: (0, uuid_1.v4)(), name, noseUrl: noseImageUrl, faceUrl: faceImageUrl };
            }
            catch (err) {
                return err;
            }
        },
    },
};
