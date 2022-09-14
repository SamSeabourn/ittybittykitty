//TODO: Broken on re-render, lift duration up

import { useState, useEffect, useRef } from 'react'
import { zeroPad } from '../../helpers'

interface Props {
	duration: number
}

export const Timer = ({ duration }: Props) => {
	const [remainingTime, setRemainingTime] = useState(duration)
	const timeoutRef = useRef(0)

	const startCountDown = () => {
		const countDown = () => {
			timeoutRef.current = window.setTimeout(() => {
				const newremainingTime = remainingTime - 1
				setRemainingTime(newremainingTime)
				if (remainingTime < 0) return
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
	}, [remainingTime])

	return <span>{renderReadableTime(remainingTime)}</span>
}

export default Timer
