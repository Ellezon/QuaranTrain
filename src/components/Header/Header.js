import React from 'react';
import * as authFns from '@/utils/authentication.util.js';

const Header = ({user}) => {
    return (
        <div className='page-header'>
          <section className='logo'>
              <a href='#'>QuaranTrain</a>
              {user && <button onClick={() => authFns.googleSignOut()}>Log Out</button>}
          </section>
        </div>
    )
}

export default Header;

