import { useEffect, useState, useRef } from 'react'
import { actions, generateDuration, Action } from './movement'
import './animations.css'
import './style.css'
import { generateRandomFromRange } from './helpers'

const Kitty = () => {
	const kittyColorShift = generateRandomFromRange(0, 360)
	const [action, setAction] = useState<Action>('idle')
	const [style, setStyle] = useState({
		left: '0px',
		transition: 'none',
		transform: 'scale(4)',
		filter: `hue-rotate(${kittyColorShift}deg)`,
	})
	const position = useRef(40)
	const direction = useRef<'left' | 'right'>('right')
	const actionsStarted = useRef(false)
	const strollSpeed = 120
	const runSpeed = 250

	const stroll = () => {
		const newLocation = generateRandomFromRange(0, window.innerWidth - 40)
		const travelDistance = Math.abs(position.current - newLocation)
		const travelTime = Math.round(travelDistance / strollSpeed) * 1000
		direction.current = newLocation < position.current ? 'left' : 'right'
		position.current = newLocation
		setAction('stroll')
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

	const run = () => {
		const newLocation = generateRandomFromRange(0, window.innerWidth - 40)
		const travelDistance = Math.abs(position.current - newLocation)
		const travelTime = Math.round(travelDistance / runSpeed) * 1000
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

	const wipe = () => {
		const wipeTime = generateDuration('wipe')
		setAction('wipe')
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
		}, wipeTime)
	}

	const sleep = () => {
		const sleepTime = generateDuration('sleep')
		setAction('sleep')
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
		}, sleepTime)
	}

	const doNextAction = () => {
		const nextAction = actions[Math.floor(Math.random() * actions.length)]
		if (nextAction === 'stroll') {
			stroll()
		}
		if (nextAction === 'wipe') {
			wipe()
		}
		if (nextAction === 'run') {
			run()
		}
		if (nextAction === 'sleep') {
			sleep()
		}
	}

	useEffect(() => {
		if (!actionsStarted.current) {
			actionsStarted.current = true
			// console.log('initialize movement')
			doNextAction()
		}
	}, [])

	return <div style={style} className={`kitty-test-${action} kitty`} />
}

export default Kitty
