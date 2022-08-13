export const actions = [
	'idle',
	'wag',
	'lick',
	'wipe',
	'stroll',
	'run',
	'sleep',
	'swipe',
	'jump',
	'hiss',
]

export type Action =
	| 'idle'
	| 'wag'
	| 'lick'
	| 'wipe'
	| 'stroll'
	| 'run'
	| 'sleep'
	| 'swipe'
	| 'jump'
	| 'hiss'

export const generateDuration = (action: Action) => {
	let min = 10
	let max = 1
	switch (action) {
		case 'idle':
			min = 10
			max = 60
			break
		case 'wag':
			min = 10
			max = 60
			break
		case 'lick':
			min = 10
			max = 30
			break
		case 'wipe':
			min = 5
			max = 10
			break
		case 'stroll':
			min = 5
			max = 40
			break
		case 'run':
			min = 5
			max = 40
			break
		case 'sleep':
			min = 8
			max = 10
			break
		case 'swipe':
			min = 1
			max = 1
			break
		case 'jump':
			min = 0.5
			max = 0.5
			break
		case 'hiss':
			min = 1
			max = 1
			break
		default:
			min = 1
			max = 1
	}
	return Math.floor(Math.random() * (max - min + 1) + min) * 1000
}

export const buildCSSTransition = () => {
	return `transition: left ease-in-out 10s`
}
