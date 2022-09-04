import { useState } from 'react'
import OSWindow from '../oswindow'

interface ScoreProps {
	id: string
	isActive: boolean
	setActive: (id: string) => void
}

const Score = ({ id, isActive, setActive }: ScoreProps) => {
	return (
		<OSWindow
			id={id}
			title='SCORE CARD'
			size='small'
			startingShift={0}
			setActive={setActive}
			isActive={isActive}
		>
			<span>1234</span>
		</OSWindow>
	)
}

export default Score
