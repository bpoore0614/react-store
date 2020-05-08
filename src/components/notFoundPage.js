import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = props => (
			<div>
				<h1>Page Not Found</h1>
				<p>Sorry, there is nothing to see here.</p>
				<p><Link to="app">Back to Home</Link></p>
			</div>
		);
export default NotFoundPage;