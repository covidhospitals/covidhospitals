import './App.css';

import CovidMap from './Map'
import ReactGA from 'react-ga';
ReactGA.initialize('G-H31DC3YHMR');

function App() {
  return (
    <div className="App">
      <CovidMap />
    </div>
  );
}

export default App;
