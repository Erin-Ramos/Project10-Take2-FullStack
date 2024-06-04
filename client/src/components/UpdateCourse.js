import { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { api } from '../utils/apiHelper';
import ErrorsDisplay from '../components/ErrorsDisplay';

const UpdateCourse = () => {
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const courseTitle = useRef(null);
    const courseDescription = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);
    const [course, setCourse] = useState(null);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await api(`/courses/${id}`, "GET", null, {
                    emailAddress: authUser.email,
                    password: authUser.password
                });

                if (res.status === 200) {
                    const responseData = await res.json();
                    setCourse(responseData);
                } else if (res.status === 400) {
                    const data = await res.json();
                    setErrors(data.errors);
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.error('Error fetching course data', error);
                navigate('/Error');
            }
        };

        fetchCourse();
    }, [authUser, id, navigate]);

    useEffect(() => {
        if (course) {
            courseTitle.current.value = course.title;
            courseDescription.current.value = course.description;
            estimatedTime.current.value = course.estimatedTime;
            materialsNeeded.current.value = course.materialsNeeded;
        }
    }, [course]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateCourse = {
            userId: authUser.id,
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value
        };

        try {
            const res = await api(`/courses/${id}`, "PUT", updateCourse, {
                emailAddress: authUser.email,
                password: authUser.password
            });
            if (res.status === 204) {
                navigate(`/courses/${id}`);
            } else if (res.status === 400) {
                const data = await res.json();
                setErrors(data.errors);
            } else {
                throw new Error('Failed to update course');
            }
        } catch (error) {
            console.error('Error updating course data', error);
            navigate('/Error');
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <main>
            <div className='wrap'>
                <h2>Update Course</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <div className='main--flex'>
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input
                                id="courseTitle"
                                name="courseTitle"
                                type="text"
                                ref={courseTitle}
                                defaultValue={course ? course.title : ''}
                            />
                            <p>
                                By {authUser.firstName} {authUser.lastName}
                            </p>
                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea
                                id="courseDescription"
                                name="courseDescription"
                                ref={courseDescription}
                                defaultValue={course ? course.description : ''}
                            />
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                ref={estimatedTime}
                                defaultValue={course ? course.estimatedTime : ''}
                            />
                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea
                                id="materialsNeeded"
                                name="materialsNeeded"
                                ref={materialsNeeded}
                                defaultValue={course ? course.materialsNeeded : ''}
                            />
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    );
};

export default UpdateCourse;
