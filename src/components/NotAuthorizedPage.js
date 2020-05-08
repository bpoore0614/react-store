import React from 'react';
import {Link} from 'react-router-dom';

const Unathorized = props => (
			<div>
				<h1>Unathorized</h1>
			
				<p><Link to="app">Back to Home</Link></p>
			</div>
		);
export default Unathorized;