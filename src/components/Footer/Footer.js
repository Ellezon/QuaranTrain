import React from 'react';
import * as authFns from "@/utils/authentication.util";
import store from "@/redux/createStore";
import userAction from "@/redux/reducers/user/actions";
import { getUserIsLoggedIn } from "@/redux/reducers/user/selectors";
import { connect } from "react-redux";

const blurFilter = () => (
	<svg><defs/><defs><filter id="goo"><feGaussianBlur in="SourceGraphic" result="goo-blur" stdDeviation="13"/><feColorMatrix in="goo-blur" values="255 255 255 255 255, 255 255 255 255 255, 255 255 255 255 255, 0 0 0 20 -11"/></filter></defs></svg>
);

const logoutUser = () => {
	authFns.googleSignOut();

	store.dispatch(userAction.logoutUser());
};

const Footer = ({ onCameraClick }) => {

	return (
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
						<span className='menu-item exit' onClick={() => logoutUser()} />
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	isLoggedIn: getUserIsLoggedIn(state),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

