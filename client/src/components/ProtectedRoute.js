import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../utils/apiHelper';
import NotFound from './NotFound';

const ProtectedRoute = ({ component: Component }) => {
  const { id } = useParams();
  const [isValidCourse, setIsValidCourse] = useState(null);

  useEffect(() => {
    const checkCourseExists = async () => {
      try {
        const res = await api(`/courses/${id}`, 'GET');
        if (res.status === 200) {
          setIsValidCourse(true);
        } else {
          setIsValidCourse(false);
        }
      } catch (err) {
        setIsValidCourse(false);
      }
    };

    checkCourseExists();
  }, [id]);

  if (isValidCourse === null) {
    return null;
  }

  return isValidCourse ? <Component /> : <NotFound />;
};

export default ProtectedRoute;
