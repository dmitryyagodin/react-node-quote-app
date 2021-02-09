import logo from './logo.svg';
import React from 'react';
import './App.css';
import QuoteBox from './QuoteBox';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then(res => res.json())
      .then(data => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
        <QuoteBox />
      </header>
    </div>
  );
}

export default App;
