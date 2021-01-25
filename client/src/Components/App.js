import React from 'react'
import { FriendsProvider } from './AppSubComps/FriendsContext'
import Nav from './AppSubComps/Nav'
import Contacts from './AppSubComps/Contacts'
import Msgs from './AppSubComps/Msgs'

const App = ({ theme }) => {
	const id = window.localStorage.getItem('id')

	return (
		<div>
			<Nav t={theme} />
			<main>
				<FriendsProvider>
					<Contacts id={id} />
					<Msgs id={id} />
				</FriendsProvider>
			</main>
		</div>
	)
}

export default App
