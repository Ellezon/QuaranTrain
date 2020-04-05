import React from 'react';

import Logo from '@/images/logo.png'

const SplashScreen = () => {
    return (
        <div className='splash-screen'>
            <img src={Logo} alt="" />
            <h3>QuaranTrain</h3>
        </div>
    );
}

export default SplashScreen;
