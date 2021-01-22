import React from 'react'

const FindFriend = ({ ff, changeFind }) => {
	return (
		<div className='ffd' style={{ display: ff ? 'block' : 'none' }}>
			<div className='one'>
				<div>
					<button onClick={changeFind} className='btn btn-primary'>
						Close
					</button>
				</div>
				<input
					type='text'
					name='username'
					id='usename'
					placeholder='Enter Name'
				/>
				<button className='btn btn-primary'>Find</button>
				<div className='peoples'>
					<div className='people'>
						<div>
							<h2>username</h2>
						</div>
						<h2 className='req-btn'>Add</h2>
					</div>
					<div className='people'>
						<div>
							<h2>username</h2>
						</div>
						<h2 className='req-btn'>Add</h2>
					</div>
					<div className='people'>
						<div>
							<h2>username</h2>
						</div>
						<h2 className='req-btn'>Add</h2>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FindFriend
