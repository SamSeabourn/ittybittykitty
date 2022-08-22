import { useEffect, useState, useRef, MouseEventHandler } from 'react'
import { actions, generateDuration } from './movement'
import './animations.css'
import './style.css'
import { generateRandomFromRange, getColorShift } from './helpers'
import Nametag from '../nametag'
import { KittenColor, KittenCSS, Action } from './module'

interface props {
	color: KittenColor
	name: string
}

const Kitty = ({ color, name }: props) => {
	const position = useRef(40)
	const kittyColorShift = getColorShift(color)
	const [action, setAction] = useState<Action>('idle')
	const [style, setStyle] = useState({
		left: `${position}px`,
		transition: 'none',
		filter: `hue-rotate(${kittyColorShift}deg)`,
	})
	const [direction, setDirection] = useState<'left' | 'right'>('right')
	const actionsStarted = useRef(false)

	const cssBuilder = (css: KittenCSS) => {
		return {
			left: `${position}px`,
			transition: 'none',
			filter: `hue-rotate(${kittyColorShift}deg)`,
			...css,
		}
	}

	const doStationaryAction = (actionName: Action) => {
		const duration = generateDuration(actionName)
		setAction(actionName)
		setStyle(
			cssBuilder({
				left: `${position.current}px`,
				transition: `left ease-in-out 0s`,
			})
		)
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
		setStyle(
			cssBuilder({
				left: `${newLocation}px`,
				transition: `left ease-in-out ${travelTime}ms`,
			})
		)

		const timeout = setTimeout(() => {
			doNextAction()
			clearTimeout(timeout)
		}, travelTime)
	}

	const doZoomies = () => {
		const movementSpeed = 400
		let locationsCount = generateRandomFromRange(6, 15)
		const zoomie = () => {
			if (locationsCount !== 0) {
				const newLocation = generateRandomFromRange(
					40,
					window.innerWidth - 40
				)
				const travelDistance = Math.abs(position.current - newLocation)
				let travelTime = Math.round(
					(travelDistance / movementSpeed) * 1000
				)
				setDirection(newLocation < position.current ? 'left' : 'right')
				position.current = newLocation
				setAction('run')
				setStyle(
					cssBuilder({
						left: `${newLocation}px`,
						transition: `left ease-in-out ${travelTime}ms`,
					})
				)
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

	const doPounce = (e: any) => {
		if (!['idle', 'wag', 'wipe'].includes(action)) return
		const rect = e.target.getBoundingClientRect()
		const leftEdgeDist = Math.abs(rect.left - e.clientX)
		const rightEdgeDist = Math.abs(rect.right - e.clientX)
		const min = Math.min(leftEdgeDist, rightEdgeDist)
		switch (min) {
			case leftEdgeDist:
				if (direction !== 'left') return
				const newLocationLeft = position.current - 100
				position.current = newLocationLeft
				setAction('jump')
				setStyle(
					cssBuilder({
						left: `${newLocationLeft}px`,
						transition: `left ease-in-out 500ms`,
					})
				)
				const timeout1 = setTimeout(() => {
					doNextAction()
					clearTimeout(timeout1)
				}, 500)
				break
			case rightEdgeDist:
				if (direction !== 'right') return
				const newLocationRight = position.current + 100
				position.current = newLocationRight
				setAction('jump')
				setStyle(
					cssBuilder({
						left: `${newLocationRight}px`,
						transition: `left ease-in-out 500ms`,
					})
				)
				const timeout2 = setTimeout(() => {
					doNextAction()
					clearTimeout(timeout2)
				}, 500)
				break
		}
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
				if (
					!['run', 'stroll', 'zoomies', 'pounce'].includes(
						previousAction
					)
				) {
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
		<div
			style={style}
			className='kitty__wrapper'
			onMouseEnter={e => doPounce(e)}
		>
			<Nametag name={name} />
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
