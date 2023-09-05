import './App.css';
import Loginpage from './pages/Loginpage'
import Homepage from './pages/Homepage'
import Prediagnosispage from './pages/Prediagnosispage'
import Registrationpage from './pages/Registrationpage'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
document.body.style = 'background: black;'



function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' Component={Loginpage}/>
            <Route path='/home' Component={Homepage}/>
            <Route path='/register' Component={Registrationpage}/>
            <Route path='/prediagnosis' Component={Prediagnosispage}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
