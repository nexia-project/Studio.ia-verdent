import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LandingPage } from './pages/landing'
import { StudentLogin, TeacherLogin, InstitutionLogin, GovernmentLogin } from './pages/auth'
import { StudentDashboard } from './pages/student/dashboard'
import { TutorPage } from './pages/student/tutor'
import { FazedoresPage } from './pages/student/fazedores'
import { TeacherDashboard } from './pages/teacher/dashboard'
import { InstitutionDashboard } from './pages/institution/dashboard'
import { GovernmentDashboard } from './pages/government/dashboard'
import { AdminDashboard } from './pages/admin/dashboard'
import { RootLayout } from './components/layout/root-layout'
import { ProtectedRoute } from './components/layout/protected-route'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    children: [
      { path: 'aluno', element: <StudentLogin /> },
      { path: 'professor', element: <TeacherLogin /> },
      { path: 'instituicao', element: <InstitutionLogin /> },
      { path: 'governo', element: <GovernmentLogin /> },
    ],
  },
  {
    element: <RootLayout />,
    children: [
      {
        path: '/aluno',
        element: <ProtectedRoute allowedRoles={['student']} />,
        children: [
          { path: '', element: <StudentDashboard /> },
          { path: 'tutor', element: <TutorPage /> },
          { path: 'fazedores', element: <FazedoresPage /> },
        ],
      },
      {
        path: '/professor',
        element: <ProtectedRoute allowedRoles={['teacher', 'institution_admin', 'admin']} />,
        children: [
          { path: '', element: <TeacherDashboard /> },
        ],
      },
      {
        path: '/instituicao',
        element: <ProtectedRoute allowedRoles={['institution_admin', 'admin']} />,
        children: [
          { path: '', element: <InstitutionDashboard /> },
        ],
      },
      {
        path: '/governo',
        element: <ProtectedRoute allowedRoles={['government', 'admin']} />,
        children: [
          { path: '', element: <GovernmentDashboard /> },
        ],
      },
      {
        path: '/admin',
        element: <ProtectedRoute allowedRoles={['admin']} />,
        children: [
          { path: '', element: <AdminDashboard /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])