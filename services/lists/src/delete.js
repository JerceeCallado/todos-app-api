import * as dynamoDbLib from '../../../libs/dynamodb-lib';
import { success, failure } from '../../../libs/response-lib';

export async function main(event, context) {
  const params = {
    TableName: process.env.tablename,
    Key: {
      pk: event.pathParameters.userId,
      sk: event.pathParameters.listId
    }
  };

  try {
    const result = await dynamoDbLib.call('delete', params);
    return success(result.Item);
  } catch (e) {
    return failure({ status: false, error: e });
  }
}
