
// eslint-disable-next-line
function fetchDelhiHospitals() {
    return fetch('/.netlify/functions/delhi-data-collector').then(r => r.json())
        .then((r) => {
            const { hData, bData } = r;
            var allHospitals = []
            for (let hName of Object.keys(hData)) {
                let hValue = hData[hName];
                let locationLink = hValue.location;
                if (!locationLink) {
                    continue;
                }
                let locIdx = locationLink.indexOf('/@'),
                    startIdx = locIdx + 2,
                    latLong = locationLink.substring(startIdx, startIdx + 21).split(",");
                if (locIdx < 0) {
                    continue;
                }
                // bData.beds[hName];
                var general = {}, icu = {}, o2 = {};
                if (bData.beds[hName]) {
                    general = {
                        total: bData.beds[hName].total,
                        occupied: bData.beds[hName].occupied,
                        available: bData.beds[hName].vacant
                    }
                }
                if (bData.covid_icu_beds[hName]) {
                    icu = {
                        total: bData.covid_icu_beds[hName].total,
                        occupied: bData.covid_icu_beds[hName].occupied,
                        available: bData.covid_icu_beds[hName].vacant
                    }
                }
                if (bData.oxygen_beds[hName]) {
                    o2 = {
                        total: bData.oxygen_beds[hName].total,
                        occupied: bData.oxygen_beds[hName].occupied,
                        available: bData.oxygen_beds[hName].vacant
                    }
                }

                allHospitals.push({
                    name: hName,
                    type: hValue.type,
                    phoneNumber: hValue.contact_numbers,
                    lastUpdatedAt: bData.last_updated_at,
                    general: general,
                    o2: o2,
                    icu: icu,
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
                source: "https://coronabeds.jantasamvad.org",
                hospitals: allHospitals
            }
        })
}

// function fetchAPHospitals() {
//     return fetch('https://raw.githubusercontent.com/covidhospitals/datacollector/main/ap-hospitals-locations-live.json').then(response => response.json());
// }

// function fetchDelhiData() {
//     return fetch('https://api.npoint.io/4d61424b0910b4a2b692').then(response => response.json());
// }

async function fetchCovidData(locations, data, state, source) {
    return Promise.all([
        fetch(locations).then(r => r.json()),
        fetch(data).then(r => r.json())
    ]).then(result => {
        var [locations, beds] = result;
        var lastUpdatedAt;
        var hospitals = beds.map(h => {
            var locKey = `${h.hospital_name}::${h.district}`;
            var hLocation = locations[locKey];
            if (!hLocation) {
                return undefined;
            }
            if (!lastUpdatedAt || h.last_updated_on > lastUpdatedAt) {
                lastUpdatedAt = h.last_updated_on
            }
            return {
                name: h.hospital_name,
                phoneNumber: h.hospital_phone,
                type: '',
                lastUpdatedAt: h.last_updated_on,
                district: h.district,
                general: {
                    total: h.total_beds_without_oxygen,
                    available: h.available_beds_without_oxygen,
                    occupied: h.total_beds_without_oxygen - h.available_beds_without_oxygen
                },
                icu: {
                    total: h.total_icu_beds_with_ventilator,
                    available: h.available_icu_beds_with_ventilator,
                    occupied: h.total_icu_beds_with_ventilator - h.available_icu_beds_with_ventilator
                },
                o2: {
                    total: h.total_beds_with_oxygen,
                    available: h.available_beds_with_oxygen,
                    occupied: h.total_beds_with_oxygen - h.available_beds_with_oxygen
                },
                location: hLocation
            }
        }).filter(h => !!h);
        return {
            stateOrLocality: state,
            source: source,
            lastUpdatedAt,
            hospitals
        }
    });
}


function fetchAPHospitals() {
    return Promise.all([
        fetch('https://raw.githubusercontent.com/covidhospitals/datacollector/main/ap/ap-locations.json').then(r => r.json()),
        fetch('https://covidaps.com/data/covidaps.com/bed_data.json').then(r => r.json())
    ]).then(result => {
        var [locations, beds] = result;
        var lastUpdatedAt;
        var hospitals = beds.map(h => {
            var locKey = `${h.hospital_name}::${h.district}`;
            var hLocation = locations[locKey];
            if (!hLocation) {
                return undefined;
            }
            if (!lastUpdatedAt || h.last_updated_on > lastUpdatedAt) {
                lastUpdatedAt = h.last_updated_on
            }
            return {
                name: h.hospital_name,
                phoneNumber: h.hospital_phone,
                type: '',
                lastUpdatedAt: h.last_updated_on,
                district: h.district,
                general: {
                    total: h.total_beds_without_oxygen,
                    available: h.available_beds_without_oxygen,
                    occupied: h.total_beds_without_oxygen - h.available_beds_without_oxygen
                },
                icu: {
                    total: h.total_icu_beds_with_ventilator,
                    available: h.available_icu_beds_with_ventilator,
                    occupied: h.total_icu_beds_with_ventilator - h.available_icu_beds_with_ventilator
                },
                o2: {
                    total: h.total_beds_with_oxygen,
                    available: h.available_beds_with_oxygen,
                    occupied: h.total_beds_with_oxygen - h.available_beds_with_oxygen
                },
                location: hLocation
            }
        }).filter(h => !!h);
        return {
            stateOrLocality: 'Andhra Pradesh',
            source: "https://covidaps.com",
            lastUpdatedAt,
            hospitals
        }
    });
}


function fetchTSHospitals() {
    return Promise.all([
        fetch('https://raw.githubusercontent.com/covidhospitals/datacollector/main/ts/ts-locations.json').then(r => r.json()),
        fetch('https://covidtelangana.com/data/covidtelangana.com/bed_data.json').then(r => r.json())
    ]).then(result => {
        var [locations, beds] = result;
        var lastUpdatedAt;
        var hospitals = beds.map(h => {
            var locKey = `${h.hospital_name}::${h.district}`;
            var hLocation = locations[locKey];
            if (!hLocation) {
                return undefined;
            }
            if (!lastUpdatedAt || h.last_updated_on > lastUpdatedAt) {
                lastUpdatedAt = h.last_updated_on
            }
            return {
                name: h.hospital_name,
                phoneNumber: h.hospital_phone,
                type: '',
                lastUpdatedAt: h.last_updated_on,
                district: h.district,
                general: {
                    total: h.total_beds_without_oxygen,
                    available: h.available_beds_without_oxygen,
                    occupied: h.total_beds_without_oxygen - h.available_beds_without_oxygen
                },
                icu: {
                    total: h.total_icu_beds_with_ventilator,
                    available: h.available_icu_beds_with_ventilator,
                    occupied: h.total_icu_beds_with_ventilator - h.available_icu_beds_with_ventilator
                },
                o2: {
                    total: h.total_beds_with_oxygen,
                    available: h.available_beds_with_oxygen,
                    occupied: h.total_beds_with_oxygen - h.available_beds_with_oxygen
                },
                location: hLocation
            }
        }).filter(h => !!h);
        return {
            stateOrLocality: 'Telangana',
            source: "https://covidtelangana.com",
            lastUpdatedAt,
            hospitals
        }
    });
}

function fetchBangloreHospitals() {
    return Promise.all([
        fetch('https://raw.githubusercontent.com/covidhospitals/datacollector/main/banglore/bangalore-locations.json').then(r => r.json()),
        fetch('https://covidbengaluru.com/data/covidbengaluru.com/bed_data.json').then(r => r.json())
    ]).then(result => {
        var [locations, beds] = result;
        var lastUpdatedAt;
        var hospitals = beds.map(h => {
            var locKey = `${h.hospital_name}::${h.district}`;
            var hLocation = locations[locKey];
            if (!hLocation) {
                return undefined;
            }
            if (!lastUpdatedAt || h.last_updated_on > lastUpdatedAt) {
                lastUpdatedAt = h.last_updated_on
            }
            return {
                name: h.hospital_name,
                phoneNumber: h.hospital_phone,
                type: '',
                lastUpdatedAt: h.last_updated_on,
                district: h.district,
                general: {
                    total: h.total_beds_without_oxygen,
                    available: h.available_beds_without_oxygen,
                    occupied: h.total_beds_without_oxygen - h.available_beds_without_oxygen
                },
                icu: {
                    total: h.total_icu_beds_with_ventilator,
                    available: h.available_icu_beds_with_ventilator,
                    occupied: h.total_icu_beds_with_ventilator - h.available_icu_beds_with_ventilator
                },
                o2: {
                    total: h.total_beds_with_oxygen,
                    available: h.available_beds_with_oxygen,
                    occupied: h.total_beds_with_oxygen - h.available_beds_with_oxygen
                },
                location: hLocation
            }
        }).filter(h => !!h);

        return {
            stateOrLocality: 'Bangalore',
            source: "https://covidbengaluru.com",
            lastUpdatedAt,
            hospitals
        }
    });
}


function fetchWBHospitals() {
    return Promise.all([
        fetch('https://raw.githubusercontent.com/covidhospitals/datacollector/main/wb/wb-locations.json').then(r => r.json()),
        fetch('https://covidwb.com/data/covidwb.com/bed_data.json').then(r => r.json())
    ]).then(result => {
        var [locations, beds] = result;
        var lastUpdatedAt;
        var hospitals = beds.map(h => {
            var locKey = `${h.hospital_name}::${h.district}`;
            var hLocation = locations[locKey];
            if (!hLocation) {
                return undefined;
            }
            if (!lastUpdatedAt || h.last_updated_on > lastUpdatedAt) {
                lastUpdatedAt = h.last_updated_on
            }
            return {
                name: h.hospital_name,
                phoneNumber: h.hospital_phone,
                type: '',
                lastUpdatedAt: h.last_updated_on,
                district: h.district,
                general: {
                    total: h.total_beds_without_oxygen,
                    available: h.available_beds_without_oxygen,
                    occupied: h.total_beds_without_oxygen - h.available_beds_without_oxygen
                },
                icu: {
                    total: h.total_icu_beds_with_ventilator,
                    available: h.available_icu_beds_with_ventilator,
                    occupied: h.total_icu_beds_with_ventilator - h.available_icu_beds_with_ventilator
                },
                o2: {
                    total: h.total_beds_with_oxygen,
                    available: h.available_beds_with_oxygen,
                    occupied: h.total_beds_with_oxygen - h.available_beds_with_oxygen
                },
                location: hLocation
            }
        }).filter(h => !!h);

        return {
            stateOrLocality: 'West Bengal',
            source: "https://covidwb.com",
            lastUpdatedAt,
            hospitals
        }
    });
}

export default function fetchAllData() {
    return [
        fetchAPHospitals(),
        fetchTSHospitals(),
        fetchDelhiHospitals(),
        fetchBangloreHospitals(),
        fetchWBHospitals(),
        fetchCovidData('https://raw.githubusercontent.com/covidhospitals/datacollector/main/ahmedabad/ahmedabad-locations.json', 'https://covidamd.com/data/covidamd.com/bed_data.json', "Ahmedabad", "https://covidamd.com"),
        fetchCovidData('https://raw.githubusercontent.com/covidhospitals/datacollector/main/pune/pune-locations.json', 'https://covidpune.com/data/covidpune.com/bed_data.json', "Pune", "https://covidpune.com/"),
        fetchCovidData('https://raw.githubusercontent.com/covidhospitals/datacollector/main/vadodara/vadodara-locations.json', ' https://covidbaroda.com/data/covidbaroda.com/bed_data.json', "Vadodara", "https://covidbaroda.com/"),
        fetchCovidData('https://raw.githubusercontent.com/covidhospitals/datacollector/main/tn/tn-locations.json', 'https://covidtnadu.com/data/covidtnadu.com/bed_data.json', "Tamil Nadu", "https://covidtnadu.com/"),
        fetchCovidData('https://raw.githubusercontent.com/covidhospitals/datacollector/main/mp/mp-locations.json', 'https://covidmp.com/data/covidmp.com/bed_data.json', "Madhya Pradesh", "https://covidmp.com/"),
        fetchCovidData('https://raw.githubusercontent.com/covidhospitals/datacollector/main/gandhinagar/gandhinagar-locations.json', 'https://covidgandhinagar.com/data/covidgandhinagar.com/bed_data.json', "Gandhinagar", "https://covidgandhinagar.com/"),
        fetchCovidData('https://raw.githubusercontent.com/covidhospitals/datacollector/main/nashik/nashik-locations.json', 'https://covidnashik.com/data/covidnashik.com/bed_data.json', "Nashik", "https://covidnashik.com/"),
        fetchCovidData('https://raw.githubusercontent.com/covidhospitals/datacollector/main/beed/beed-locations.json', 'https://covidbeed.com/data/covidbeed.com/bed_data.json', "Beed", "https://covidbeed.com/"),
    ]
}