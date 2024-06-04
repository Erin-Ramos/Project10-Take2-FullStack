import { Link } from 'react-router-dom';

export default function Forbidden() {
    return (
        <>
            <div className="wrap">
                <h1>Forbidden</h1>
                <p>Sorry! You are not authorized to perform this action.</p>
            </div>
            <div className="wrap">
                <Link className="button" to={'/'}>Return to List</Link>
            </div>
        </>
    );
};