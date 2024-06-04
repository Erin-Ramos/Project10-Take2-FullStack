import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { api } from '../utils/apiHelper';
import ErrorsDisplay from '../components/ErrorsDisplay';

// Function to create a new course
const CreateCourse = () => {
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();

    // References to form input fields
    const courseTitle = useRef(null);
    const courseDescription = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);
    const [errors, setErrors] = useState([]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new course object with the form data and authenticated user ID
        const newCourse = {
            userId: authUser.id,
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value
        };

        try {
            const res = await api("/courses", "POST", newCourse, {
                emailAddress: authUser.email,
                password: authUser.password
            });

            if (res.status === 201) {
                navigate('/');
            } else if (res.status === 400) {
                const data = await res.json();
                setErrors(data.errors);
            } else { 
                console.log(`Unexpected Error. Status code: ${res.status}`)
                navigate('/Error');
            }
        } catch (error) {
            console.error('Error creating course:', error);
            navigate("/error");
        }
    };

    // Handle cancel button to navigate back to the home page
    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <main>
            <div className='wrap'>
                <h2>Create Course</h2>
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
                            />
                            <p>
                                By {authUser.firstName} {authUser.lastName}
                            </p>
                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea
                                id="courseDescription"
                                name="courseDescription"
                                ref={courseDescription}
                            />
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                ref={estimatedTime}
                            />
                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea
                                id="materialsNeeded"
                                name="materialsNeeded"
                                ref={materialsNeeded}
                            />
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    );
};

export default CreateCourse;
