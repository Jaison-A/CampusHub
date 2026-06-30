import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './../components/ProtectedRoute';
import Notes from '../pages/Notes';
import Assignments from '../pages/Assignments';
import Profile from '../pages/Profile';
import MyProgress from '../pages/MyProgress';
import ClassProgress from '../pages/ClassProgress';
import AssignmentProgressDetails from '../pages/AssignmentProgressDetails';
import AddAssignment from '../pages/AddAssignment';
import AddNotes from '../pages/AddNotes';
import Layout from '../components/Layout';
import EditAssignment from '../pages/EditAssignment';
import EditNote from '../pages/EditNote';
import ViewPdf from '../pages/ViewPdf';
import { useAuth } from '../context/AuthContext';

function AuthRedirect() {
  const { token } = useAuth();
  const isAuthenticated = Boolean(token || localStorage.getItem('token'));

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Layout>
                <Notes />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/assignments"
          element={
            <ProtectedRoute>
              <Layout>
                <Assignments />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Layout>
                <MyProgress />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/class-progress"
          element={
            <ProtectedRoute>
              <Layout>
                <ClassProgress />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/class-progress/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <AssignmentProgressDetails />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-note"
          element={
            <ProtectedRoute>
              <Layout>
                <AddNotes />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-assignment"
          element={
            <ProtectedRoute>
              <Layout>
                <AddAssignment />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-assignment/:id"
          element={
            <ProtectedRoute>
              <EditAssignment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-note/:id"
          element={
            <ProtectedRoute>
              <EditNote />
            </ProtectedRoute>
          }
        />
        <Route path="/view-pdf/:id" element={<ViewPdf />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
