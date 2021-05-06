const fetch = require("node-fetch");

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    var response = await fetch(`https://coronabeds.jantasamvad.org/${event.path}`).then(r => r.text());
    return { statusCode: 500, body: response };
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
