const AWS = require("aws-sdk")

const insertArtist = async (event) => {
    
    const {id, name, age, startDate} = JSON.parse(event.body);
    
    var responseBody = "";
    var statusCode = 0;
    
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    
    const newArtist = {
        id,
        name,
        age,
        startDate
    };
    
    try {
        
        await dynamodb.put({
            TableName: "Artist",
            Item: newArtist
        }).promise()
        
        responseBody = JSON.stringify(newArtist)
        statusCode = 200
        
        
    } catch (e) {
        responseBody = JSON.stringify(e)
        statusCode = 400
    }
    
   const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': true
        },
        body:responseBody
    };
    
    return response;
    
}


module.exports = {
    handler:insertArtist
}
