import { useEffect, useRef } from 'react'
import { zeroPad } from '../../helpers'
import './style.css'

interface TimerProps {
	kittyWaitDuration: number
	setKittyWaitDuration: (time: number) => void
	setIsKittyAvaliable: Function
}

export const Timer = ({
	kittyWaitDuration,
	setKittyWaitDuration,
	setIsKittyAvaliable,
}: TimerProps) => {
	const timeoutRef = useRef(0)

	const startCountDown = () => {
		const countDown = () => {
			if (kittyWaitDuration === 0) {
				setIsKittyAvaliable(true)
				window.clearTimeout(timeoutRef.current)
				return
			}
			timeoutRef.current = window.setTimeout(() => {
				const newremainingTime = kittyWaitDuration - 1
				setKittyWaitDuration(newremainingTime)
				window.clearTimeout(timeoutRef.current)
				countDown()
			}, 1000)
		}
		countDown()
	}

	const renderReadableTime = (inputSeconds: number) => {
		// const days = Math.floor((inputSeconds % 31536000) / 86400)
		const hours = Math.floor(((inputSeconds % 31536000) % 86400) / 3600)
		const minutes = Math.floor(
			(((inputSeconds % 31536000) % 86400) % 3600) / 60
		)
		const seconds = (((inputSeconds % 31536000) % 86400) % 3600) % 60
		return `${zeroPad(hours, 2)}:${zeroPad(minutes, 2)}:${zeroPad(
			seconds,
			2
		)}`
	}

	useEffect(() => {
		startCountDown()
		return () => {
			window.clearTimeout(timeoutRef.current)
		}
	}, [kittyWaitDuration])

	return (
		<span>{`Kitten available in ${renderReadableTime(
			kittyWaitDuration
		)}`}</span>
	)
}

export default Timer
