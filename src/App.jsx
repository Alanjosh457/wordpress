import Header from './Header';
import { Routes, Route } from 'react-router-dom';


import Urlpage from './Urlpage';
import Weather from './Weather';

function App() {
  return (
    <>
      <Header />
   
      <Routes>
        <Route path="/" element={<Urlpage />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </>
  );
}

export default App;
