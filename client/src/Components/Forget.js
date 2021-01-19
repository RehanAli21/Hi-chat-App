import axios from 'axios'
import React from 'react'

function Forget() {
	return (
		<div
			style={{
				fontFamily: 'sans-serif',
				textAlign: 'center',
				color: '#007bdb'
			}}>
			<h1 style={{ margin: '5% 0px 20px 0px' }}>Forget Password</h1>
			<div>
				<input
					style={{ margin: '30px 0px 20px 0px' }}
					type='text'
					name='username'
					placeholder='Enter Username...'
				/>
			</div>
			<div>
				<input
					style={{ margin: '0px 0px 20px 0px' }}
					type='text'
					name='recover'
					placeholder='Enter Recover Text...'
				/>
			</div>
			<div>
				<input
					style={{ margin: '0px 0px 20px 0px' }}
					type='text'
					name='password'
					placeholder='New Password...'
				/>
			</div>
			<div>
				<input
					style={{ margin: '0px 0px 20px 0px' }}
					type='text'
					name='conpassword'
					placeholder='Confirm Password...'
				/>
			</div>
			<div style={{ margin: '20px 0px' }}>
				<button class='btn btn-primary'>Forget Password</button>
			</div>
		</div>
	)
}

export default Forget
