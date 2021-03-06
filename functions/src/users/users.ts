const awsSdk = require('aws-sdk');
const dynamoDb = new awsSdk.DynamoDB.DocumentClient({
  region: 'us-east-1',
});

interface usersParams {
  q: string;
  sort?: string;
  order?: string;
  per_page?: number;
  page?: number;
}

class Users {
  getUsers(event:usersParams) {
    return {
      message: 'Go Serverless v1.0! Your function executed successfully!',
    };
  }

  createUser(
    token:string,
    id:string,
    name:string,
    email:string,
    company:string,
    avatar_url:string,
    location:string,
    html_url:string,
    url:string,
  ) {
    const data = { token, id, name, email, company, avatar_url, location, html_url, url };
    const params = {
      TableName: 'users',
      Item: data,
    };

    return new Promise((resolve:any, reject:any) => {
      dynamoDb.put(params, (error:any) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = Users;
