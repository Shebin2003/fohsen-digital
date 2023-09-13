import './App.css';
import Loginpage from './pages/Loginpage'
import Homepage from './pages/Nurse/Homepage'
import Prediagnosispage from './pages/Nurse/Prediagnosispage'
import Registrationpage from './pages/Nurse/Registrationpage'
import Symptomspage from './pages/Doctor/Symptomspage'
import Doctorhomepage from './pages/Doctor/Doctorhomepage'
import Userconsultation from './context/consultation/Consultationstate'
import Selectionpage from './pages/Nurse/Selectionpage'
import Consultationpage from './pages/Doctor/Consultationpage'
import Consultationpage2 from './pages/Doctor/Consultationpage2'
import Historypage1 from './pages/Doctor/Historypage1'
import Historypage2 from './pages/Doctor/Historypage2'
import Diagnosispage from './pages/Doctor/Diagnosispage'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Detailsstate from './context/details/Detailsstate';
import Addsymptomspage from './pages/Doctor/Addsymptomspage'
import Symptomstate from './context/symptoms/Symptomstate'
import Notespage from './pages/Doctor/Notespage'
document.body.style = 'background: black;'

function App() {
  return (
    <>
    <BrowserRouter>
    <Detailsstate>
        <Userconsultation>
          <Symptomstate>
        <Routes>
            <Route path='/' Component={Loginpage}/>
            <Route path='/nursehome' Component={Homepage}/>
            <Route path='/register' Component={Registrationpage}/>
            <Route path='/prediagnosis' Component={Prediagnosispage}/>
            <Route path='/select' Component={Selectionpage}/>
            <Route path='/doctorhome' Component={Doctorhomepage}/>
            <Route path='/consultation' Component={Consultationpage}/>
            <Route path='/consultation2' Component={Consultationpage2}/>
            <Route path='/history1' Component={Historypage1}/>
            <Route path='/history2' Component={Historypage2}/>
            <Route path='/symptoms' Component={Symptomspage}/>
            <Route path='/diagnosis' Component={Diagnosispage}/>
            <Route path='/addsymptoms' Component={Addsymptomspage}/>
            <Route path='/notes' Component={Notespage}/>
        </Routes>
        </Symptomstate>
        </Userconsultation>
      </Detailsstate>
    </BrowserRouter>
    </>
  );
}

export default App;
