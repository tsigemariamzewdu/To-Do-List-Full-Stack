
import './App.css';
import {BrowserRouter as Router,Route,Routes, Navigate} from "react-router-dom"
import Home from './pages/homepage/Home';
import Classified from './pages/Classifiedtaskpage/Classified';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
  const isAuthenticated= !!localStorage.getItem("token")
  return (
<Router>
  <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path='/login'element={<Login/>}></Route>
    <Route path="/home" element={ isAuthenticated? <Home/>: <Navigate to="/login" replace/>}/>
    <Route path="/register" element ={<Register/>}/>
    <Route path="/classified-tasks" element={<Classified/>}/>

  </Routes>

</Router>

  );
}

export default App;
