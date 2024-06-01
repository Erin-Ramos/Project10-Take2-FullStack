import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import './styles/global.css';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import NotFound from './components/NotFound';
import Error from './components/Error';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Header />
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/courses" />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<ProtectedRoute component={CourseDetail} />} />
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/:id/update" element={<UpdateCourse />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signout" element={<UserSignOut />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Navigate to="/notfound" />} />
          <Route path="/notfound" element={<NotFound />} />
        </Routes>
      </>
    </>
  )
};

export default App;
