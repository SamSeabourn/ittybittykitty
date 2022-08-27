import './style.css'

interface Props {
	startOpen: boolean
	toggleStart: () => void
}

const StartMenuButton = ({ startOpen, toggleStart }: Props) => {
	const buttonClass = `start-menu-button${startOpen ? '__open' : ''}`

	const handleClick = () => {
		toggleStart()
	}

	return (
		<div className={buttonClass} onClick={() => handleClick()}>
			<span className='start-menu-button--text'>START</span>
		</div>
	)
}

export default StartMenuButton
