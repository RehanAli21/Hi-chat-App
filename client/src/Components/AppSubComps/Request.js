import React from 'react'

const Request = ({ req, changeReq }) => {
	return (
		<div className='ffd' style={{ display: req ? 'block' : 'none' }}>
			<div className='two'>
				<div>
					<button onClick={changeReq} className='btn btn-primary'>
						Close
					</button>
				</div>
				<h1>Requests</h1>
				<div className='peoples'>
					<div className='req'>
						<h2>Rehan</h2>
						<h2 className='req-btn'>Add</h2>
						<h2 className='req-btn'>Remove</h2>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Request
