import client from "../config/dynamoClient.js";
import { BatchGetItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export async function getProperties(propertiesID) {
  const params = {
    RequestItems: {
      properties: {
        Keys: propertiesID.map(id => ({
          id: { S: id }
        }))
      }
    }
  };

  const command = new BatchGetItemCommand(params);
  const res = await client.send(command);
  const rawItems = res.Responses.properties ?? [];
  return rawItems.map(item => unmarshall(item)); 
}