"use strict";
const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const InsertToDo = async (event) => {

  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const { work } = JSON.parse(event.body);
  const createdAt = new Date().toISOString();
  const id = v4();
  const newWork = {
    id,
    work,
    createdAt,
    completed: false
  }
  await dynamoDb.put({
    TableName: "InsertToDo",
    Item: newWork
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newWork),
    };
};

module.exports = {
    handler: InsertToDo,
};
