import React from 'react';

const blurFilter = () => (
	<svg><defs/><defs><filter id="goo"><feGaussianBlur in="SourceGraphic" result="goo-blur" stdDeviation="13"/><feColorMatrix in="goo-blur" values="255 255 255 255 255, 255 255 255 255 255, 255 255 255 255 255, 0 0 0 20 -11"/></filter></defs></svg>
);

const Footer = ({ onCameraClick }) =>
  <div id='footer'>
		<div className='footer-wrapper'>
			<div className='footer-menu'>
				<div className='blob-container'>
						<div className="blob"> </div>
						{blurFilter()}
				</div>
				<div className='menu-container'>
					<span className='menu-item home' />
					<span className='menu-item favourites' />
					<span className='menu-item camera' onClick={() => onCameraClick()} />
					<span className='menu-item profile' />
					<span className='menu-item settings' />
				</div>
			</div>
		</div>
  </div>;

export default Footer;

