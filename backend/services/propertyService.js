import client from "../config/dynamoClient.js";
import { BatchGetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
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

export async function getAllProperties() {
  const params = {
    TableName: process.env.PROPERTIES_TABLE || 'properties'
  };

  let allItems = [];
  let lastEvaluatedKey;

  do {
    if (lastEvaluatedKey) {
      params.ExclusiveStartKey = lastEvaluatedKey;
    }

    const command = new ScanCommand(params);
    const res = await client.send(command);

    if (res.Items) {
      allItems = allItems.concat(res.Items.map(item => unmarshall(item)));
    }

    lastEvaluatedKey = res.LastEvaluatedKey;
  } while (lastEvaluatedKey);

  return allItems;
}