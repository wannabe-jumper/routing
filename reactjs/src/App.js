import logo from './logo.svg';
import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import LoginPage from './Pages/loginPage';
import Page1 from './Pages/page1';
import TablePage from './Pages/TablePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LoginPage/>} />
        <Route exact path='/Page1' element={<Page1/>} />
        <Route exact path='/TablePage' element={<TablePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
