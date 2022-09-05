import OSWindow from '../oswindow'
import './style.css'
interface ScoreProps {
	id: string
	isActive: boolean
	setActive: (id: string) => void
	score: number
}

const Score = ({ id, isActive, setActive, score }: ScoreProps) => {
	return (
		<OSWindow
			id={id}
			title='SCORE'
			size='small'
			startingShift={0}
			setActive={setActive}
			isActive={isActive}
		>
			<span className='score'>{score}</span>
		</OSWindow>
	)
}

export default Score
