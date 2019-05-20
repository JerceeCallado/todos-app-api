import * as dynamoDbLib from '../../../libs/dynamodb-lib';
import { success, failure } from '../../../libs/response-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tablename,
    Key: {
      pk: event.pathParameters.userId,
      sk: event.pathParameters.listId
    },
    UpdateExpression: 'set name = :name',
    ExpressionAttributeValues: {
      ':name': data.name
    }
  };

  try {
    await dynamoDbLib.call('update', params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false, error: e });
  }
}
