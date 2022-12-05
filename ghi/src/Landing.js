import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
	return (
		<div className='jumbotron centered'>
			<div className="container offset-3 col-6 mb-3">
				<i className='fas fa-key fa-6x' />
				<h1 className='display-3'>Direct Rep</h1>
				<p className='lead'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</p>
				<hr />
				<a className='btn btn-light btn-lg' href='/signup' role='button'>
					Register
				</a>
				<a className='btn btn-dark btn-lg' href='/login' role='button'>
					Login
				</a>
			</div>
		</div>
	);
}

export default LandingPage;
