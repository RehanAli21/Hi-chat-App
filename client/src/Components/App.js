import React, { Component } from 'react'
import Nav from './AppSubComps/nav'
import Contacts from './AppSubComps/Contacts'
import Msgs from './AppSubComps/Msgs'

const App = ({ theme, changethemeState }) => {
	return (
		<div>
			<Nav
				name={'Rehan Ali'}
				theme={theme === 'white' ? 'dark' : 'white'}
				changeTheme={changethemeState}
			/>
			<main>
				<Contacts />
				<Msgs />
			</main>
		</div>
	)
}

export default App
