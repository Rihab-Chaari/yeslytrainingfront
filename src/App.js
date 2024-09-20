// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserSelection from './pages/UserSelection';
import SignupFormateur from './pages/Formateur/SignupFormateur';
import SignupEtudiant from './pages/Etudiant/SignupEtudiant';
import Login from './pages/Login';
import DashboardEtudiant from './pages/Etudiant/DashboardEtudiant';
import AddCoursForm from './pages/Formateur/AddCoursForm';
import CourseList from './pages/Formateur/CourseList';
import EditCourse from './pages/Formateur/EditCourse';
import Home from './pages/Formateur/Home';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import ManageStudents from './pages/Etudiant/ManageStudents';
import ManageCoursesPage from './pages/Responsable/ManageCoursesPage';
import StatisticsPage from './pages/Responsable/StatisticsPage';
import Courses from './pages/Etudiant/Courses';
import CoursFormateur from './pages/Formateur/CoursFormateur';
import Profile from './components/Profile';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSelection />} />
        <Route path="/signup/formateur" element={<SignupFormateur />} />
        <Route path="/signup/etudiant" element={<SignupEtudiant />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stats" element={<StatisticsPage />} />
        <Route path="/dashboard/etudiant" element={<DashboardEtudiant />} />
        <Route path="/add-course" element={<AddCoursForm />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/edit-course/:id" element={<EditCourse />} />
        <Route path="/home" element={<Home />} />
        <Route path="/manage-students" element={<ManageStudents />} />
        <Route path="/Course-Details" element={<ManageCoursesPage />} />
        <Route path="/view-courses" element={<Courses />} />
        <Route path="/formateur-courses" element={<CoursFormateur />} />
        <Route path="/profile" element={<Profile />} />
   
      </Routes>
    </Router>
  );
}

export default App;
