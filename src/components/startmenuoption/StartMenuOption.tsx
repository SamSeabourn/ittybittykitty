import React from 'react'
import './style.css'

type Props = {
	children: React.ReactNode
	icon?: string
}

const StartMenuOption = ({ children, icon }: Props) => {
	return (
		<div className='start-menu-option'>
			<img src={icon} /> {children}
		</div>
	)
}

export default StartMenuOption
