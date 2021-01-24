import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Request = ({ req, changeReq }) => {
	const [received_reqs, setReceived_reqs] = useState([])

	useEffect(() => {
		getRequests()
	}, [req])

	const getRequests = () => {
		const id = window.localStorage.getItem('id')

		axios
			.get(`http://localhost:5000/request/received/${id}`)
			.then(res => setReceived_reqs(res.data.request_received))
			.catch(err => console.error(err))
	}

	const showReq = () => {
		return received_reqs.length > 0 ? (
			received_reqs.map(req => (
				<div key={req.username} className='req'>
					<h2>{req.name}</h2>
					<h2
						onClick={() => acceptReq(req.username)}
						className='req-btn'>
						Add
					</h2>
					<h2 className='req-btn'>Remove</h2>
				</div>
			))
		) : (
			<div className='req'>
				<h2>No Requests</h2>
			</div>
		)
	}

	const acceptReq = username => {
		axios
			.put(`http://localhost:5000/request/add`, {
				id: window.localStorage.getItem('id'),
				username: username
			})
			.then(res => alert(res.data.msg))
			.catch(err => console.log(err))

		showReq()
	}

	return (
		<div className='ffd' style={{ display: req ? 'block' : 'none' }}>
			<div className='two'>
				<div>
					<button onClick={changeReq} className='btn btn-primary'>
						Close
					</button>
				</div>
				<h1>Requests</h1>
				<div className='peoples'>{showReq()}</div>
			</div>
		</div>
	)
}

export default Request
