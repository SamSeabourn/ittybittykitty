import './style.css'

interface Props {
	startOpen: boolean
	toggleStart: (e: any) => void
}

const StartMenuButton = ({ startOpen, toggleStart }: Props) => {
	const buttonClass = `start-menu-button${startOpen ? '__open' : ''}`
	return (
		<div className={buttonClass} onClick={e => toggleStart(e)}>
			<span className='start-menu-button--text'>START</span>
		</div>
	)
}

export default StartMenuButton
