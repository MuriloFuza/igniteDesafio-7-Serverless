import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {

  const {userid} = event.pathParameters;

  const response = await document.scan({
    TableName: 'users_todo',
    FilterExpression: 'user_id = :id',
    ExpressionAttributeValues:{
      ':id':userid
    },


  }).promise();

  const usersTodo = response.Items;
  console.log(usersTodo)
  
  if(usersTodo.length > 0){
    return {
      statusCode: 200,
      body: JSON.stringify({
        usersTodo,
      })
    }
  }else{
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Você ainda não criou nenhum TODO'
      })
    }
  }
}