import { useEffect, useState, useRef } from 'react'
import { actions, generateDuration, Action } from './movement'
import './animations.css'
import './style.css'
import { generateRandomFromRange, getColorShift } from './helpers'
import Nametag from '../nametag/Nametag'
import { KittenColor, KittenCSS } from './module'

interface props {
	color: KittenColor
}

const Kitty = ({ color }: props) => {
	const startingLocation = useRef(40)
	const kittyColorShift = getColorShift(color)
	const [action, setAction] = useState<Action>('idle')
	const [style, setStyle] = useState({
		left: `${startingLocation}px`,
		transition: 'none',
		filter: `hue-rotate(${kittyColorShift}deg)`,
	})
	const [direction, setDirection] = useState<'left' | 'right'>('right')
	const position = startingLocation
	const actionsStarted = useRef(false)

	const cssBuilder = (css: KittenCSS) => {
		return {
			left: `${startingLocation}px`,
			transition: 'none',
			filter: `hue-rotate(${kittyColorShift}deg)`,
			...css,
		}
	}

	const doStationaryAction = (actionName: Action) => {
		const duration = generateDuration(actionName)
		setAction(actionName)
		setStyle({
			left: `${position.current}px`,
			transition: `left ease-in-out 0s`,
			filter: `hue-rotate(${kittyColorShift})`,
		})
		const timeout = setTimeout(() => {
			doNextAction()
			clearTimeout(timeout)
		}, duration)
	}

	const doMovementAction = (actionName: Action) => {
		const movementSpeed = actionName === 'run' ? 250 : 125
		const newLocation = generateRandomFromRange(40, window.innerWidth - 40)
		const travelDistance = Math.abs(position.current - newLocation)
		const travelTime = Math.round(travelDistance / movementSpeed) * 1000
		setDirection(newLocation < position.current ? 'left' : 'right')
		position.current = newLocation
		setAction('run')
		setStyle({
			left: `${newLocation}px`,
			transition: `left ease-in-out ${travelTime}ms`,
			filter: `hue-rotate(${kittyColorShift})`,
		})
		const timeout = setTimeout(() => {
			doNextAction()
			clearTimeout(timeout)
		}, travelTime)
	}

	//TODO: broken zoomies
	const doZoomies = () => {
		let locationsCount = generateRandomFromRange(6, 15)
		const zoomie = () => {
			if (locationsCount !== 0) {
				const movementSpeed = 400
				const newLocation = generateRandomFromRange(
					40,
					window.innerWidth - 40
				)
				const travelDistance = Math.abs(position.current - newLocation)
				const travelTime =
					Math.round(travelDistance / movementSpeed) * 1000
				setDirection(newLocation < position.current ? 'left' : 'right')
				position.current = newLocation
				setAction('run')
				setStyle({
					left: `${newLocation}px`,
					transition: `left ease-in-out ${travelTime}ms`,
					filter: `hue-rotate(${kittyColorShift})`,
				})
				const timeout = setTimeout(() => {
					zoomie()
					locationsCount--
					clearTimeout(timeout)
				}, travelTime)
			} else {
				doNextAction()
			}
		}
		zoomie()
	}

	const doNextAction = () => {
		const previousAction = action
		const newAction = actions[Math.floor(Math.random() * actions.length)]
		switch (newAction) {
			case 'idle':
			case 'wag':
			case 'lick':
			case 'wipe':
				doStationaryAction(newAction)
				break
			case 'sleep':
				//Kitties dont sleep straight after run or jog :)
				if (!['run', 'stroll'].includes(previousAction)) {
					doStationaryAction('sleep')
				} else {
					doStationaryAction('idle')
				}
				break
			case 'run':
			case 'stroll':
				doMovementAction(newAction)
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
		<div style={style} className='kitty__wrapper'>
			<Nametag name={'big steve'} />
			<div
				style={{
					backgroundImage: `url('./sprites_${color}.png')`,
					transform:
						direction === 'left' ? 'scaleX(-1) scale(4)' : '',
				}}
				className={`kitty-test-${action} kitty`}
			>
				<div className='kitty__boundingbox' />
			</div>
		</div>
	)
}

export default Kitty
