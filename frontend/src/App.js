import './App.css';
import Loginpage from './pages/Loginpage'
import Homepage from './pages/Nurse/Homepage'
import Prediagnosispage from './pages/Nurse/Prediagnosispage'
import Registrationpage from './pages/Nurse/Registrationpage'
import Symptomspage from './pages/Doctor/Symptomspage'
import Doctorhomepage from './pages/Doctor/Doctorhomepage'
import Progresspage1 from './pages/Doctor/Progresspage1'
import Progresspage2 from './pages/Doctor/Progresspage2'
import Userconsultation from './context/consultation/Consultationstate'
import Selectionpage from './pages/Nurse/Selectionpage'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Detailsstate from './context/details/Detailsstate';
document.body.style = 'background: black;'

function App() {
  return (
    <>
    <BrowserRouter>
    <Detailsstate>
        <Userconsultation>
        <Routes>
            <Route path='/' Component={Loginpage}/>
            <Route path='/nursehome' Component={Homepage}/>
            <Route path='/register' Component={Registrationpage}/>
            <Route path='/prediagnosis' Component={Prediagnosispage}/>
            <Route path='/symptoms' Component={Symptomspage}/>
            <Route path='/doctorhome' Component={Doctorhomepage}/>
            <Route path='/progress' Component={Progresspage1}/>
            <Route path='/progress2' Component={Progresspage2}/>
            <Route path='/select' Component={Selectionpage}/>
        </Routes>
        </Userconsultation>
      </Detailsstate>
    </BrowserRouter>
    </>
  );
}

export default App;
