import React from 'react'
import './style.css'

type Props = {
	children: React.ReactNode
	icon?: string
	optionFunction?: () => void
}

const StartMenuOption = ({ children, icon, optionFunction }: Props) => {
	return (
		<div className='start-menu-option' onClick={optionFunction}>
			<img className='start-menu-icon' src={icon} /> {children}
		</div>
	)
}

export default StartMenuOption
