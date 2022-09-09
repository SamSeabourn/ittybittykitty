//source https://www.geeksforgeeks.org/how-to-create-a-countdown-timer-using-reactjs/
//TODO: Fix this, this is kinda shit.

import { useState, useRef, useEffect } from 'react'

interface Props {}

const Timer = () => {
	const startingValue = {
		display: '00:59:00',
		secconds: 59 * 60,
	}
	const Ref = useRef(0)
	const [timer, setTimer] = useState(startingValue.display)

	const getTimeRemaining = (e: string) => {
		const total = Date.parse(e) - Date.parse(new Date().toString())
		const seconds = Math.floor((total / 1000) % 60)
		const minutes = Math.floor((total / 1000 / 60) % 60)
		const hours = Math.floor((total / 1000 / 60 / 60) % 24)
		return {
			total,
			hours,
			minutes,
			seconds,
		}
	}

	const startTimer = (e: string) => {
		let { total, hours, minutes, seconds } = getTimeRemaining(e)
		if (total >= 0) {
			setTimer(
				(hours > 9 ? hours : '0' + hours) +
					':' +
					(minutes > 9 ? minutes : '0' + minutes) +
					':' +
					(seconds > 9 ? seconds : '0' + seconds)
			)
		}
	}

	const restartTimer = (e: string) => {
		setTimer(startingValue.display)
		if (Ref.current) clearInterval(Ref.current)
		const id = window.setInterval(() => {
			startTimer(e)
		}, 1000)
		Ref.current = id
	}

	const getDeadTime = () => {
		let deadline = new Date()
		deadline.setSeconds(deadline.getSeconds() + startingValue.secconds)
		return deadline
	}

	useEffect(() => {
		restartTimer(getDeadTime().toString())
	}, [])

	if (timer === '00:00:00') {
		window.setTimeout(() => {
			restartTimer(getDeadTime().toString())
		}, 1000)
	}

	return <span>{timer}</span>
}

export default Timer
