
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Login} />
        <Route path='/registration' Component={Registration} />
        <Route path='/home' Component={Home} />
      </Routes>
    </Router>
  );
}

export default App;
