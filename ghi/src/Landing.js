import React from 'react';


function LandingPage() {
	return (
		<div className='jumbotron centered'>
			<div className="container offset-3 col-6 mb-3">
				<i className='fas fa-key fa-6x' />
				<h1 className='display-3'>Direct Rep</h1>
				<p className='lead'>
Get in touch with your representatives and let AI help you write a letter about important political issues.
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
