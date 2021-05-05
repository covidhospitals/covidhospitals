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

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code using `npm test`.

## License

Copyright (c) 2021 Prasanna Kumar Gollangi

Licensed under the MIT license.