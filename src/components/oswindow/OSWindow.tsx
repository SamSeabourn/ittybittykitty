import React from 'react'
import Draggable from 'react-draggable'
import './style.css'

interface Props {
	id: string
	children: React.ReactNode
	title: string
	size?: 'small' | 'medium' | 'large'
	hideClose?: boolean
	startingShift: number
	isActive: boolean
	setActive: (id: string) => void
	closeWindow: (id: string) => void
}

const OSWindow = ({
	id,
	children,
	title,
	size = 'medium',
	startingShift,
	isActive,
	setActive,
	closeWindow,
	hideClose,
}: Props) => {
	let windowWidth = 300
	switch (size) {
		case 'small':
			windowWidth = 200
			break
		case 'medium':
			windowWidth = 300
			break
		case 'large':
			windowWidth = 400
			break
		default:
			break
	}

	const style = {
		zIndex: isActive ? 30 : 20,
		opacity: isActive ? 1 : 0.75,
		width: `${windowWidth}px`,
	}

	const handleClose = () => closeWindow(id)

	return (
		<Draggable
			bounds='.playground'
			defaultPosition={{
				x: window.innerWidth / 2 - windowWidth / 2 + startingShift,
				y: window.innerHeight / 2 - windowWidth / 2 + startingShift,
			}}
		>
			<div
				className='window-container'
				style={style}
				onClick={() => setActive(id)}
			>
				<div className='top-bar'>
					<div className='title'>{title}</div>
					{hideClose ? null : (
						<div className='exit' onClick={handleClose}>
							X
						</div>
					)}
				</div>
				<div className='content'>{children}</div>
			</div>
		</Draggable>
	)
}

export default OSWindow
