import { KittenColor } from './components/kitty/module'

export const generateRandomFromRange = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min)) + min
}

export const getColorShift = (color: KittenColor) => {
	if (color === 'neon' || color === 'normal') {
		return generateRandomFromRange(0, 360)
	}
	return 0
}

export const createUUID = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		var r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}

export const getKittenColor = (): KittenColor => {
	const number = generateRandomFromRange(0, 100)
	if (number >= 0 && number <= 2) {
		return 'gold'
	}
	if (number >= 2 && number <= 12) {
		return 'clear'
	}
	if (number >= 12 && number <= 35) {
		return 'neon'
	}
	if (number >= 35 && number <= 50) {
		return 'black'
	}
	if (number >= 50 && number <= 65) {
		return 'white'
	} else {
		return 'normal'
	}
}

export const preloadImage = (src: string) => {
	return new Promise((resolve, reject) => {
		let img = new Image()
		img.onload = () => {
			img.style.display = 'none'
			img.id = src
			document.body.append(img)
			return resolve(true)
		}
		img.onerror = reject
		img.src = src
	})
}

export const zeroPad = (num: number, places: number) =>
	String(num).padStart(places, '0')
