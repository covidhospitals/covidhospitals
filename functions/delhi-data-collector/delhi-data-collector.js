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
    var hospitals = await fetch(`https://coronabeds.jantasamvad.org/covid-facilities.js`).then(r => r.text());
    var hospitalData = await fetch(`https://coronabeds.jantasamvad.org/covid-info.js`).then(r => r.text());

    var hData = hospitals.replace('var gnctd_covid_facilities_data =', '').replace('};', '}')
    hData = JSON.parse(hData)
    var bData = hospitalData.replace('var gnctd_covid_data =', '').replace('};', '}')
    bData = JSON.parse(bData);

    return { statusCode: 200, body: JSON.stringify({hData, bData}) };
  } catch (error) {
    return { statusCode: 200, body: error.toString() }
  }
}

module.exports = { handler }
