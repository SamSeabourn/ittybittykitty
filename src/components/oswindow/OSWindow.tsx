import React from 'react'
import Draggable from 'react-draggable'
import './style.css'

interface Props {
	id: string
	children: React.ReactNode
	title: string
	size?: 'small' | 'medium' | 'large'
	hideClose?: boolean
	altScheme?: boolean
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
	altScheme,
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
		filter: isActive ? '' : 'contrast(0.5)',
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
				className={`window-container${altScheme ? '__alt' : ''} `}
				style={style}
				onClick={() => setActive(id)}
			>
				<div className={`top-bar${altScheme ? '__alt' : ''}`}>
					<div className={`title${altScheme ? '__alt' : ''}`}>
						{title}
					</div>
					{hideClose ? null : (
						<div
							className={`exit${altScheme ? '__alt' : ''}`}
							onClick={handleClose}
						>
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
