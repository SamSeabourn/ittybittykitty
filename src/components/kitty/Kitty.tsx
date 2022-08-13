import { useEffect, useState, useRef } from 'react'
import { actions, generateDuration, Action } from './movement'
import './animations.css'
import './style.css'
import { generateRandomFromRange } from './helpers'

const Kitty = () => {
	const [action, setAction] = useState<string>('idle')
	const [position, setPosition] = useState<number>(0)
	// const [direction. setDirection] = useState<'left' | 'right'>('right')
	const delay = useRef<number>(5000)
	const actionsStarted = useRef(false)

	// const changePosition = () => {
	// 	const width = window.innerWidth
	// 	const newPosition = generateRandomFromRange(20, width)
	// 	setPosition(newPosition)
	// }

	useEffect(() => {
		console.log('re-rendering')
		const doNextAction = () => {
			console.log('doing next action')
			const nextAction =
				actions[Math.floor(Math.random() * actions.length)]
			setAction(nextAction)
			// if (nextAction === 'stroll' || nextAction === 'run') {
			// 	changePosition()
			// }
			delay.current = generateDuration(nextAction as Action)
			const timeout = setTimeout(() => {
				clearTimeout(timeout)
				doNextAction()
			}, delay.current)
		}
		if (!actionsStarted.current) {
			actionsStarted.current = true
			console.log('initialize movement')
			doNextAction()
		}
	}, [])

	return <div style={{ left: 40 }} className={`kitty-test-${action} kitty`} />
}

export default Kitty
