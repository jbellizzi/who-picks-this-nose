import { GraphQLError } from "graphql";
import { v4 as uuid } from "uuid";

import { SHEET_ID } from "./constants";
import { PersonWithImage, Resolvers } from "./types";

const ERROR_CODE_DATA_NOT_SET = "DATA_NOT_SET";

export const resolvers: Resolvers = {
  Query: {
    people: async (_, __, { dataSources }) => {
      const values = await dataSources.googleApi.getSpreadsheetValues<string>({
        spreadsheetId: SHEET_ID,
        sheetName: "people",
        range: "A2:A1000",
      });

      return values.map((row) => ({ id: uuid(), name: row[0] }));
    },
    todaysPerson: async (_, __, { dataSources }): Promise<PersonWithImage> => {
      try {
        // get row from daily_nose sheet
        const dailyRow = await dataSources.googleApi.getSpreadsheetValues<string>({
          spreadsheetId: SHEET_ID,
          sheetName: "daily_nose",
          range: "A2:C2",
        });

        if (!dailyRow) throw new GraphQLError("Daily nose not set", { extensions: { code: ERROR_CODE_DATA_NOT_SET } });

        // extract values
        const [name, noseImage, faceImage] = dailyRow[0];
        if (!name) throw new GraphQLError("Person not set", { extensions: { code: ERROR_CODE_DATA_NOT_SET } });
        if (!noseImage) throw new GraphQLError("Nose image not set", { extensions: { code: ERROR_CODE_DATA_NOT_SET } });
        if (!faceImage) throw new GraphQLError("Face image not set", { extensions: { code: ERROR_CODE_DATA_NOT_SET } });

        // get nose image file
        const noseImageUrl = await dataSources.googleApi.getDriveImageUrl(noseImage);

        // get face image file
        const faceImageUrl = await dataSources.googleApi.getDriveImageUrl(faceImage);

        // return person with image
        return { id: uuid(), name, noseUrl: noseImageUrl, faceUrl: faceImageUrl };
      } catch (err) {
        return err;
      }
    },
  },
};
