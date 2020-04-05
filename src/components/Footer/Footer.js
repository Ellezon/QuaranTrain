import React from 'react';

const blurFilter = () => (
	<svg><defs/><defs><filter id="goo"><feGaussianBlur in="SourceGraphic" result="goo-blur" stdDeviation="13"/><feColorMatrix in="goo-blur" values="255 255 255 255 255, 255 255 255 255 255, 255 255 255 255 255, 0 0 0 20 -11"/></filter></defs></svg>
);

const handleIconClick = (type) => {
	let url ='';
	switch(type){
		case 'home': url = '/';
		break;
		case 'fav': url = '/fav';
		break;
		case 'record': url = '/record';
		break;
		case 'profile': url = '/profile';
		break;
		case 'settings': url = '/settings';
		break;
		default: url = '/';
	}
	// todo use router
	window.location.href = url;
}

const Footer = () =>
  <div id='footer'>
		<div className='footer-wrapper'>
			<div className='footer-menu'>
				<div className='blob-container'>
						<div className="blob"> </div>
						{blurFilter()}
				</div>
				<div className='menu-container'>
					<span className='menu-item home' onClick={() => handleIconClick('home')} />
					<span className='menu-item favourites' onClick={() => handleIconClick('fav')} />
					<span className='menu-item camera' onClick={() => handleIconClick('record')} />
					<span className='menu-item profile' onClick={() => handleIconClick('profile')} />
					<span className='menu-item settings' onClick={() => handleIconClick('settings')} />
				</div>
			</div>
		</div>
  </div>;

export default Footer;

