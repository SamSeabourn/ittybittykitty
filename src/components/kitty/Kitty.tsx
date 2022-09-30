import { useEffect, useState, useRef } from 'react'
import { KittenColor, KittenCSS, Action } from './module'
import { actions, generateDuration } from './movement'
import { generateRandomFromRange } from '../../helpers'
import './animations.css'
import './style.css'
import { calculateAge } from '../age'

interface Props {
	id: string
	name?: string
	birthday: Date
	color: KittenColor
	colorShift: number
	isClean: boolean
	cleanKitty: (id: string) => void
	spawnPoop: (location: number) => void
}

const Kitty = ({
	id,
	name,
	birthday,
	color,
	colorShift,
	isClean,
	cleanKitty,
	spawnPoop,
}: Props) => {
	const minLeftPosition = 110
	const position = useRef(minLeftPosition)
	const kittyColorShift = colorShift
	const [action, setAction] = useState<Action>('idle')
	const [direction, setDirection] = useState<'left' | 'right'>('right')
	const actionsStarted = useRef(false)
	const timeoutRef = useRef(0)
	const [style, setStyle] = useState({
		left: `${position}px`,
		transition: 'none',
		filter: `hue-rotate(${kittyColorShift}deg)`,
	})

	const durationHandler = (duration: number) => {
		timeoutRef.current = window.setTimeout(() => {
			doNextAction()
		}, duration)
	}

	const cssBuilder = (css: KittenCSS) => ({
		left: `${position}px`,
		transition: 'none',
		filter: `hue-rotate(${kittyColorShift}deg)`,
		...css,
	})

	const calculateScaleCSS = (
		catAgeHours: number,
		direction: 'left' | 'right'
	) => {
		const catAge: number =
			Math.round(catAgeHours / 12) < 10 ? catAgeHours : 9
		const reverseScale = direction === 'left' ? 'scaleX(-1)' : ''
		const sizeScale = `scale(4.${catAge})`
		//TODO: Work out a fancy algorythm for this
		const bottomPx = () => {
			switch (catAge) {
				case 0:
				case 1:
				case 2:
					return `${catAge}px`
				case 3:
					return `${catAge * 2}px`
				case 4:
				case 5:
					return `${catAge * 2 - 1}px`
				case 6:
				case 7:
				case 8:
					return `${catAge * 2 - 2}px`
				case 9:
					return `${catAge * 2 - 3}px`
			}
		}

		return {
			transform: `${reverseScale} ${sizeScale}`,
			bottom: bottomPx(),
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
		durationHandler(duration)
	}

	const handleClickKitty = () => cleanKitty(id)

	const doMovementAction = (actionName: Action) => {
		const movementSpeed = actionName === 'run' ? 250 : 125
		const newLocation = generateRandomFromRange(
			minLeftPosition,
			window.innerWidth - 40
		)
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
		durationHandler(travelTime)
	}

	const doZoomies = () => {
		const movementSpeed = 400
		let locationsCount = generateRandomFromRange(6, 15)
		const zoomie = () => {
			if (locationsCount !== 0) {
				const newLocation = generateRandomFromRange(
					minLeftPosition,
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
				timeoutRef.current = window.setTimeout(() => {
					zoomie()
					locationsCount--
				}, travelTime)
			} else {
				setAction('run')
				doNextAction()
			}
		}
		zoomie()
	}

	const doJump = (e: any) => {
		if (!['idle', 'wag', 'wipe'].includes(action) || !isClean) return
		clearTimeout(timeoutRef.current)
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
				durationHandler(500)
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
				durationHandler(500)
				break
		}
	}

	const doNextAction = () => {
		const previousAction = action
		const newAction = actions[Math.floor(Math.random() * actions.length)]
		if (
			['idle', 'wag', 'lick'].includes(previousAction) &&
			['run', 'stroll', 'zoomies'].includes(newAction) &&
			Math.random() < 0.1
		) {
			spawnPoop(position.current)
		}
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
					!['run', 'stroll', 'zoomies', 'jump'].includes(
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
				if (!isClean) {
					doNextAction()
				} else {
					doZoomies()
				}
				break
			default:
		}
	}

	useEffect(() => {
		if (!actionsStarted.current) {
			actionsStarted.current = true
			setTimeout(() => {
				const firstAction = Math.random() < 0.5 ? 'stroll' : 'run'
				doMovementAction(firstAction) //kittens always leave the carrier first movement
			}, generateRandomFromRange(1000, 3000))
		}
	}, [isClean])

	const kittenSprite = `url('./sprites_${isClean ? color : 'dirty'}.png')`

	return (
		<>
			<div style={style} className='kitty__wrapper'>
				<span>{name}</span>
				<div
					style={{
						backgroundImage: kittenSprite,
						...calculateScaleCSS(calculateAge(birthday), direction),
					}}
					className={`kitty-test-${action} kitty ${
						color === 'gold' && isClean ? 'gold' : ''
					}`}
					onMouseEnter={e => doJump(e)}
				>
					<div
						className='kitty__boundingbox'
						onClick={handleClickKitty}
					/>
				</div>
			</div>
		</>
	)
}

export default Kitty
