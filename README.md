# Covid19 Hospitals in India with beds availability on Map

This project is created to locate all the covid19 hospitals on the map with the availability of the beds. Site hosted at [covidhospitals.online](http://covidhospitals.online/)

## Technology stack
- [Leaflet](https://leafletjs.com/)
- [OpenStreetMap](openstreetmap.org)
- [ReactJS](https://react-leaflet.js.org/)
- [MapQuest](https://www.mapquest.com/)

## Data Source
Hospital location, and beds information is being collected and created by [covid19maps/datacollector](https://github.com/covid19maps/datacollector)

| State or Locality | Site | Normalized data |
| ------------- |-------------| ---- |
| Andhra Pradesh      | [http://dashboard.covid19.ap.gov.in/](http://dashboard.covid19.ap.gov.in/) | [https://api.npoint.io/4594de00c3f1d76a08ec](https://api.npoint.io/4594de00c3f1d76a08ec)|

Please feel make changes to this, or add more data sources. And raise a PR.
## Credits
- A big thanks [Netlify](https://netlify.com/) for hosting the [covidhospitals.online](https://covidhospitals.online/)
- Thanks to [npoint.io](https://npoint.io) for hosting the AP hospital location data.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code using `npm test`.

## License

Copyright (c) 2021 Prasanna Kumar Gollangi

Licensed under the MIT license.