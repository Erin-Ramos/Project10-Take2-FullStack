import React, { useState, useEffect } from 'react';
import '../styles/global.css'

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {

        const fetchCourses = async () => {
            try {
                let res = await fetch('http://localhost:5000/api/courses');
                res = await res.json();
                setCourses(res);
            } catch (err) {
                console.error('Error fetching courses data', err);
                throw err;
            }
        }
        fetchCourses();
    }, []);

    return (
        <div className="wrap main--grid">
            {courses.map(course => (
                <a
                    key={course.id}
                    className="course--module course--link"
                    href={`/courses/${course.id}`}
                >
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </a>
            ))}
            <a
                className="course--module course--add--module"
                href="/create"
            >
                New Course
            </a>
        </div>
    );
};

export default Courses;