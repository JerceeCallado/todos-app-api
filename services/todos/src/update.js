import * as dynamoDbLib from '../../../libs/dynamodb-lib';
import { success, failure } from '../../../libs/response-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tablename,
    Key: {
      pk: event.pathParameters.listId,
      sk: event.pathParameters.todoId
    },
    UpdateExpression:
      'set title = :title, completed = :completed, deadline = :deadline, priority = :priority',
    ExpressionAttributeValues: {
      ':title': data.title,
      ':completed': data.completed,
      ':deadline': data.deadline,
      ':priority': data.priority
    }
  };

  try {
    await dynamoDbLib.call('update', params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false, error: e });
  }
}
