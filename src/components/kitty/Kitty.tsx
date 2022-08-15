import { useEffect, useState, useRef } from 'react'
import { actions, generateDuration, Action } from './movement'
import './animations.css'
import './style.css'
import { generateRandomFromRange } from './helpers'

const Kitty = () => {
	const startingLocation = useRef(
		generateRandomFromRange(0, window.innerWidth)
	)
	const kittyColorShift = generateRandomFromRange(0, 360)
	const [action, setAction] = useState<Action>('idle')
	const [style, setStyle] = useState({
		left: `${startingLocation}px`,
		transition: 'none',
		transform: 'scale(4)',
		filter: `hue-rotate(${kittyColorShift}deg)`,
	})
	const position = startingLocation
	const direction = useRef<'left' | 'right'>('right')
	const actionsStarted = useRef(false)

	const doStationaryAction = (actionName: Action) => {
		const duration = generateDuration(actionName)
		setAction(actionName)
		setStyle({
			left: `${position.current}px`,
			transition: `left ease-in-out 0s`,
			transform: `scale(4) ${
				direction.current === 'left' ? 'scaleX(-1)' : ''
			}`,
			filter: `hue-rotate(${kittyColorShift})`,
		})
		const timeout = setTimeout(() => {
			doNextAction()
			clearTimeout(timeout)
		}, duration)
	}

	const doMovementAction = (actionName: Action) => {
		const movementSpeed = actionName === 'run' ? 250 : 125
		const newLocation = generateRandomFromRange(0, window.innerWidth - 40)
		const travelDistance = Math.abs(position.current - newLocation)
		const travelTime = Math.round(travelDistance / movementSpeed) * 1000
		direction.current = newLocation < position.current ? 'left' : 'right'
		position.current = newLocation
		setAction('run')
		setStyle({
			left: `${newLocation}px`,
			transition: `left ease-in-out ${travelTime}ms`,
			transform: `scale(4) ${
				direction.current === 'left' ? 'scaleX(-1)' : ''
			}`,
			filter: `hue-rotate(${kittyColorShift})`,
		})

		const timeout = setTimeout(() => {
			doNextAction()
			clearTimeout(timeout)
		}, travelTime)
	}

	const doZoomies = () => {}

	const doNextAction = () => {
		const action = actions[Math.floor(Math.random() * actions.length)]
		switch (action) {
			case 'idle':
			case 'wag':
			case 'lick':
			case 'wipe':
			case 'sleep':
				doStationaryAction(action)
				break
			case 'run':
			case 'stroll':
				doMovementAction(action)
				break
			case 'zoomies':
				doZoomies()
				break
			default:
		}
	}

	useEffect(() => {
		if (!actionsStarted.current) {
			actionsStarted.current = true
			doNextAction()
		}
	}, [])

	return (
		<div style={style} className={`kitty-test-${action} kitty`}>
			<div className='kitty__boundingbox'>
				{/* <div className='kitty__name' /> */}
			</div>
		</div>
	)
}

export default Kitty
