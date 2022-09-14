import React from 'react'
import './style.css'

type Props = {
	children: React.ReactNode
	isActive: boolean
	icon?: string
	optionFunction?: () => void
}

const StartMenuOption = ({
	children,
	icon,
	optionFunction,
	isActive,
}: Props) => {
	return (
		<div
			className={`start-menu-option ${isActive ? '' : 'inactive'}`}
			onClick={optionFunction}
		>
			<img className='start-menu-icon' src={icon} />
			{children}
		</div>
	)
}

export default StartMenuOption
