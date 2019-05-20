import uuid from 'uuid';
import * as dynamoDbLib from '../../../libs/dynamodb-lib';
import { success, failure } from '../../../libs/response-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const pk = event.pathParameters.userId;
  const sk = `list-${uuid.v1()}`;

  const params = {
    TableName: process.env.tablename,
    Item: {
      pk: pk,
      sk: sk,
      name: data.name,
      gsi1_pk: sk,
      gsi1_sk: pk
    }
  };

  try {
    await dynamoDbLib.call('put', params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false, error: e });
  }
}
