[![Netlify Status](https://api.netlify.com/api/v1/badges/58c2c8cf-de73-4dc1-8783-7fc964f6b87e/deploy-status)](https://app.netlify.com/sites/covidhospitals/deploys)
# Covid19 Hospitals in India with beds availability on Map

This project is created to locate all the covid19 hospitals on the map with the availability of the beds. Site hosted at [covidhospitals.online](http://covidhospitals.online/)

## Built With
- [Leaflet](https://leafletjs.com/)
- [OpenStreetMap](https://openstreetmap.org)
- [ReactJS](https://react-leaflet.js.org/)
- [MapQuest](https://www.mapquest.com/)

## Data Source
Hospital location, and beds information is being collected and created by [covidhospitals/datacollector](https://github.com/covidhospitals/datacollector)

| State or Locality | Site | Normalized data |
| ------------- |-------------| ---- |
| Andhra Pradesh      | [http://dashboard.covid19.ap.gov.in/](http://dashboard.covid19.ap.gov.in/) | [https://api.npoint.io/4594de00c3f1d76a08ec](https://api.npoint.io/4594de00c3f1d76a08ec)|
| Delhi      | [https://coronabeds.jantasamvad.org/](https://coronabeds.jantasamvad.org/) | [https://api.npoint.io/4d61424b0910b4a2b692](https://api.npoint.io/4d61424b0910b4a2b692)|

Please feel make changes to this, or add more data sources. And raise a PR.
## Credits
- A big thanks [Netlify](https://netlify.com/) for hosting the [covidhospitals.online](https://covidhospitals.online/)
- Thanks to [npoint.io](https://npoint.io) for hosting the AP hospital location data.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code using `npm test`.

## License

Copyright (c) 2021 Prasanna Kumar Gollangi

Licensed under the MIT license.