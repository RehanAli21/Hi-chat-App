import React from 'react'

const Request = ({ req, changeReq }) => {
	return (
		<div className='ffd' style={{ display: req ? 'block' : 'none' }}>
			<div className='two'>
				<div>
					<button onClick={changeReq} className='btn btn-primary'>
						X
					</button>
				</div>
				<h1>Requests</h1>
				<div className='peoples'>
					<div className='req'>
						<h2>Rehan</h2>
						<button className='btn btn-primary'>Add</button>
						<button className='btn btn-primary'>Remove</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Request
