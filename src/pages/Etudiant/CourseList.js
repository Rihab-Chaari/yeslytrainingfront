import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCourse from './ItemCourse';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get('http://localhost:8081/api/cours');
      setCourses(response.data);
    };

    const fetchRegisteredCourses = async () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (user && user.id) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        try {
          const response = await axios.get(`http://localhost:8081/api/inscriptions/${user.id}`, config);
          const inscriptions = response.data || [];
          setRegisteredCourses(inscriptions.map(inscription => inscription.coursId)); // Vérifiez ici que coursId est correct
        } catch (error) {
          console.error('Erreur lors de la récupération des inscriptions :', error);
        }
      }
    };

    fetchCourses();
    fetchRegisteredCourses();
  }, []);

  return (
    <div>
      {courses.map(course => (
        <ItemCourse
          key={course.id}
          course={course}
          registeredCourses={registeredCourses}
        />
      ))}
    </div>
  );
};

export default CourseList;
