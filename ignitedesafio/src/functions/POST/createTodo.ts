import { document } from "src/utils/dynamodbClient";
import {v4 as uuidV4} from 'uuid'

interface ICreateTodo {
  title: string;
  deadline: string;
}

export const handle = async (event) => {
  const { userid } = event.pathParameters;
  const { title, deadline} = JSON.parse(event.body) as ICreateTodo;

  const res = await document.put({
    TableName: 'users_todo',
    Item:{
      id: uuidV4(),
      user_id: userid,
      title,
      done: false,
      deadline: new Date(deadline).toString()
    }
  }).promise();

  console.log(res)

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Todo criado com sucesso!',
    }),
    headers: {
      "Content-Type":"application/json",
    },
  };
}