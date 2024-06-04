import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';

import { api } from '../utils/apiHelper';
import UserContext from '../context/UserContext';

const Course = () => {
    const { authUser } = useContext(UserContext);
    const [course, setCourse] = useState({});

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Function to fetch course data from API
        const fetchCourse = async () => {
            try {
                const res = await api(`/courses/${id}`, "GET", null, authUser);
                if (res.status === 200) {
                    const resData = await res.json();
                    setCourse(resData)
                } else if (res.status === 404) {
                    navigate('/NotFound')
                } else { 
                    console.log(`Unexpected Error. Status code: ${res.status}`)
                    navigate('/Error');
                }
            } catch (error) {
                console.error('Error fetching course data', error);
                navigate('/Error');
            }
        }
        fetchCourse();
    }, [authUser, id, navigate]);

    // Function to delete a course
    const deleteCourse = async (e) => {
        e.preventDefault();
        try {
            const res = await api(`/courses/${id}`, "DELETE", null, {
                emailAddress: authUser.email, 
                password: authUser.password
            });

            if (res.status === 204) {
                navigate('/');
            } else if (res.status === 401) {
                console.log('You are not authorized to delete this course');
            } else {
                console.log(`Unexpected Error. Status code: ${res.status}`)
                navigate('/Error');
            }
        } catch (err) {
            console.error('Error deleting course', err);
            navigate('/Error');
        }
    }

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                        {authUser && authUser.id === course.userId && (
                            <>
                                <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                                <button className="button" onClick={deleteCourse}>Delete Course</button>
                            </>
                        )}
                    

                    <Link className="button" to={'/'}>Return to List</Link>
                </div>
            </div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {course.user?.firstName} {course.user?.lastName}</p>
                            <Markdown>{course.description}</Markdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <Markdown>{course.materialsNeeded}</Markdown>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Course;
