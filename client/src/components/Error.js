import { Link } from 'react-router-dom';

export default function Error() {
    return (
        <>
            <div className="wrap">
                <h1>Error</h1>
                <p>Sorry! An Error has occurred. See console for more information.</p>
            </div>
            <div className="wrap">
                <Link className="button" to={'/'}>Return to List</Link>
            </div>
        </>
    );
};