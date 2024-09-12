// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserSelection from './pages/UserSelection';
import SignupFormateur from './pages/Formateur/SignupFormateur';
import SignupEtudiant from './pages/Etudiant/SignupEtudiant';
import Login from './pages/Login';
import DashboardFormateur from './pages/Formateur/DashboardFormateur'; // Formateur-specific dashboard
import DashboardEtudiant from './pages/Etudiant/DashboardEtudiant'; // Etudiant-specific dashboard
import AddCoursForm from './pages/Formateur/AddCoursForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSelection />} />
        <Route path="/signup/formateur" element={<SignupFormateur />} />
        <Route path="/signup/etudiant" element={<SignupEtudiant />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/formateur" element={<DashboardFormateur />} />
        <Route path="/dashboard/etudiant" element={<DashboardEtudiant />} />
        <Route path="/add-course" element={<AddCoursForm />} /> 
      </Routes>
    </Router>
  );
}

export default App;
