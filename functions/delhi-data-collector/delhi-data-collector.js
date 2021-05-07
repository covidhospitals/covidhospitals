const fetch = require("node-fetch");

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {

  if (event.httpMethod === 'OPTIONS') {
    // To enable CORS
    return {
      statusCode: 200, // <-- Important!
      headers,
      body: 'This was OPTIONS request!'
    };
  }


  try {
    var path = event.queryStringParameters.path
    var response = await fetch(`https://coronabeds.jantasamvad.org/${path}`).then(r => r.text());
    return { statusCode: 200, body: response };
  } catch (error) {
    return { statusCode: 200, body: error.toString() }
  }
}

module.exports = { handler }
