import { KittenColor } from './module'

export const generateRandomFromRange = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min)) + min
}

export const getColorShift = (color: KittenColor) => {
	if (color === 'neon' || color === 'normal') {
		return generateRandomFromRange(0, 360)
	}
	return 0
}
