import React from 'react';
import classNames from 'classnames';

import Logo from '@/images/logo.png'

const SplashScreen = ({ isHidden }) => {

    const splashScreenClasses = classNames('splash-screen', {
        'is-hidden': isHidden,
    });

    return (
        <div className={splashScreenClasses}>
            <img src={Logo} alt="" />
            <h3>QuaranTrain</h3>
        </div>
    );
}

export default SplashScreen;
