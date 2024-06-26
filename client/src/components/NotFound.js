import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <>
            <div className="wrap">
                <h1>Not Found</h1>
                <p>Sorry! We couldn't find the page you were looking for.</p>
            </div>
            <div className="wrap">
                <Link className="button" to={'/'}>Return to List</Link>
            </div>
        </>
    );
};