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
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import ManageStudents from './pages/Etudiant/ManageStudents';
//import ManageCoursesPage from './pages/Responsable/ManageCoursesPage';
import StatisticsPage from './pages/Responsable/StatisticsPage';
import Courses from './pages/Etudiant/Courses';
import CoursFormateur from './pages/Formateur/CoursFormateur';
import Profile from './components/Profile';
import Students from './pages/Responsable/Students';
import EditStudent from './pages/Etudiant/EditStudent';
import MyRegistrations from './pages/Etudiant/MyRegistrations';
import PaymentForm from './components/PaymentForm';
import ReceiptDownload from './pages/Etudiant/ReceiptDownload';
import Trainers from './pages/Responsable/Trainers';
import Cours from './pages/Responsable/Cours'
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
        <Route path="/manage-students" element={<ManageStudents />} />
        <Route path="/Course-Details" element={<Cours />} />
        <Route path="/view-courses" element={<Courses />} />
        <Route path="/formateur-courses" element={<CoursFormateur />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/students" element={<Students />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />
        <Route path="/payment-form" element={<PaymentForm />} />
        <Route path="/receipts/:id" element={<ReceiptDownload />} />
   
      </Routes>
    </Router>
  );
}

export default App;
