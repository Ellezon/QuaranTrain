import React from 'react';

const Header = ({ type }) => {
    return (
        <div className={`page-header ${type}`}>
            <div className='page-header-logo' />
            <div className='page-header-name'>
                QuaranTrain
            </div>
        </div>
    );
}

export default Header
