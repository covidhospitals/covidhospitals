
// eslint-disable-next-line
function fetchDelhiHospitals() {
    return Promise.all(
        fetch('https://coronabeds.jantasamvad.org/covid-facilities.js', {mode: 'no-cors'}).then(r => r.text()),
        fetch('https://coronabeds.jantasamvad.org/covid-info.js', {mode: 'no-cors'}).then(r => r.text())
    ).then((hData, bData) => {
        hData = hData.replace('var gnctd_covid_facilities_data =', '').replace('};', '}')
        hData = JSON.parse(hData)
        bData = bData.replace('var gnctd_covid_data =', '').replace('};', '}')
        bData = JSON.parse(bData);

        var allHospitals = []
        for (let hName of Object.keys(hData)) {
            let hValue = hData[hName];
            let locationLink = hValue.location;
            let startIdx = locationLink.indexOf('/@') + 2;
            let latLong = locationLink.substring(startIdx, startIdx + 21).split(",");
            
            // bData.beds[hName];

            allHospitals.push({
                name: hName,
                type: hValue.type,
                phoneNumber: hValue.contact_numbers,
                location: {
                    formattedAddress: hValue.address,
                    link: hValue.location,
                    latitude: latLong[0],
                    longitude: latLong[1],
                }
            })
        }
        return {
            lastUpdatedAt: bData.last_updated_at,
            stateOrLocality: "Delhi",
            source: "https://coronabeds.jantasamvad.org/",
            hospitals: allHospitals
        }
    })
}

function fetchAPHospitals() {
    return fetch('https://api.npoint.io/4594de00c3f1d76a08ec').then(response => response.json());
}


export default function fetchAllData() {
    return Promise.all([fetchAPHospitals()])
}