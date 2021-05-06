import './App.css';

import CovidMap from './Map'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-196384229-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  return (
    <div className="App">
      <CovidMap />
    </div>
  );
}

export default App;
