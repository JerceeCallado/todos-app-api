import uuid from 'uuid';
import * as dynamoDbLib from '../../../libs/dynamodb-lib';
import { success, failure } from '../../../libs/response-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tablename,
    Item: {
      pk: event.pathParameters.listId,
      sk: `todo-${uuid.v1()}`,
      title: data.title,
      completed: data.completed,
      deadline: data.deadline,
      priority: data.priority
    }
  };

  try {
    await dynamoDbLib.call('put', params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false, error: e });
  }
}
