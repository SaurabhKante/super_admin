import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import './App.css';
import AboutToExpire from './Components/AboutToExpire';
import DuesTable from './Components/DuesTable';
import MainForm from './Components/MainForm';
import Table from './Components/Table';
import {data} from "./data"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<MainForm />} path="/" />
          <Route element={<Table data={data}/>} path="/superadmin"  />
          <Route element={<DuesTable />} path="/duestable"  />
          <Route element={<AboutToExpire />} path="/aboutexpire"  />
      
      </Routes>
      </Router>
    </div>
  );
}

export default App;
