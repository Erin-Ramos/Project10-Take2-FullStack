// TODO: PULLED FROM REACT-AUTH FILE - NOT READY

import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header" style={{ background: accentColor }}>
      <div className="bounds">
        <Link to="/"><h1 className="header--logo">MyAuth</h1></Link>
        <Nav />
      </div>
    </div>
  );
};

export default Header