import React, { useState } from 'react'
import axios from 'axios'

const FindFriend = ({ ff, changeFind }) => {
	const [input, setInput] = useState('')
	const [name, setName] = useState('')
	const [u, setU] = useState('')
	const [show, setShow] = useState(false)
	const id = window.localStorage.getItem('id')

	const onSearch = () => {
		axios
			.get(`http://localhost:5000/request/${input}`)
			.then(res => {
				if (
					res.data.username ===
					window.localStorage.getItem('username')
				)
					return alert('The searched username is yours')
				setName(res.data.name ? res.data.name : res.data.msg)
				setU(res.data.username)
				setShow(true)
			})
			.catch(err => console.error(err))
	}

	const result = () => {
		return name !== 'Username did not match!' ? (
			<div
				style={{ display: show ? 'block' : 'none' }}
				className='peoples'>
				<div className='people'>
					<div>
						<h2>{name}</h2>
					</div>
					<h2 onClick={sendRequest} className='req-btn'>
						Add
					</h2>
				</div>
			</div>
		) : (
			<div
				style={{ display: show ? 'block' : 'none' }}
				className='peoples'>
				<div className='people'>
					<div>
						<h2>{name}</h2>
					</div>
				</div>
			</div>
		)
	}

	const sendRequest = () => {
		axios
			.put('http://localhost:5000/request/send', {
				id: id,
				username: u
			})
			.then(res => {
				alert(res.data.msg)
			})
			.catch(err => alert('Username is same as yours username'))

		clearComponentData()
	}

	const clearComponentData = () => {
		setInput('')
		setName('')
		setShow(false)
		document.getElementById('find-input-username').value = ''
	}

	return (
		<div className='ffd' style={{ display: ff ? 'block' : 'none' }}>
			<div className='one'>
				<div>
					<button onClick={changeFind} className='btn btn-primary'>
						Close
					</button>
				</div>
				<h1 style={{ margin: '-20px 0px 20px 0px' }}>Find Friend</h1>
				<input
					type='text'
					name='username'
					id='find-input-username'
					placeholder='Enter Name'
					onChange={e => setInput(e.target.value)}
				/>
				<button className='btn btn-primary' onClick={onSearch}>
					Find
				</button>
				{result()}
			</div>
		</div>
	)
}

export default FindFriend
