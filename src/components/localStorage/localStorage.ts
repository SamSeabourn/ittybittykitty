import { Kitten } from '../kitty/module'

export const initLocalStorage = () => {
	if (localStorage.getItem('kittenStorage') === null) {
		localStorage.setItem('kittenStorage', JSON.stringify([]))
	}
	if (localStorage.getItem('score') === null) {
		localStorage.setItem('score', JSON.stringify(0))
	}
	if (localStorage.getItem('disclaimer') === null) {
		localStorage.setItem('disclaimer', JSON.stringify(false))
	}
}

export const addKittenToLocalStorage = (newKitten: Kitten) => {
	const storageString = localStorage.getItem('kittenStorage')
	const existingKittens = JSON.parse(storageString as string)
	localStorage.setItem(
		'kittenStorage',
		JSON.stringify([...existingKittens, newKitten])
	)
}

export const getKittensFromLocalStorage = () => {
	const storageString = localStorage.getItem('kittenStorage')
	const existingKittens = JSON.parse(storageString as string)
	return existingKittens
}

export const getScoreFromLocalStorage = () => {
	const storageString = localStorage.getItem('score')
	const score = JSON.parse(storageString as string)
	return Number(score)
}

export const addPointsToLocalStorage = (points: number) => {
	const storageString = localStorage.getItem('score')
	const score = JSON.parse(storageString as string)
	const updatedScore = points + Number(score)
	localStorage.setItem('score', JSON.stringify(updatedScore))
}

export const updateKittenInLocalStorage = (
	id: string,
	key: string,
	value: any
) => {
	const storageString = localStorage.getItem('kittenStorage')
	let existingKittens = JSON.parse(storageString as string)
	for (let i = 0; i < existingKittens.length; i++) {
		if (existingKittens[i].id === id) {
			existingKittens[i][key] = value
			localStorage.setItem(
				'kittenStorage',
				JSON.stringify([...existingKittens])
			)
		}
	}
}

export const getDisclaimerRead = () => {
	const storageString = localStorage.getItem('disclaimer')
	const disclaimerRead = JSON.parse(storageString as string)
	return disclaimerRead
}

export const setDisclaimerRead = () => {
	localStorage.setItem('disclaimer', JSON.stringify(true))
}
