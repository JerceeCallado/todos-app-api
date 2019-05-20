import * as dynamoDbLib from '../../../libs/dynamodb-lib';
import { success, failure } from '../../../libs/response-lib';

export async function main(event, context) {
  const params = {
    TableName: process.env.tablename,
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: {
      ':pk': event.pathParameters.listId
    }
  };

  try {
    const result = await dynamoDbLib.call('query', params);
    return success(result.Items);
  } catch (e) {
    return failure({ status: false, error: e });
  }
}
