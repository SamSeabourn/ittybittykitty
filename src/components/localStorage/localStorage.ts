import secureLocalStorage from 'react-secure-storage'
import { Kitten } from '../kitty/module'

export const initLocalStorage = () => {
	if (secureLocalStorage.getItem('kittenStorage') === null) {
		secureLocalStorage.setItem('kittenStorage', JSON.stringify([]))
	}
	if (secureLocalStorage.getItem('score') === null) {
		secureLocalStorage.setItem('score', JSON.stringify(0))
	}
	if (secureLocalStorage.getItem('disclaimer') === null) {
		secureLocalStorage.setItem('disclaimer', JSON.stringify(false))
	}
}

export const addKittenToLocalStorage = (newKitten: Kitten) => {
	const storageString = secureLocalStorage.getItem('kittenStorage')
	const existingKittens = JSON.parse(storageString as string)
	secureLocalStorage.setItem(
		'kittenStorage',
		JSON.stringify([...existingKittens, newKitten])
	)
}

export const getKittensFromLocalStorage = () => {
	const storageString = secureLocalStorage.getItem('kittenStorage')
	const existingKittens = JSON.parse(storageString as string)
	return existingKittens
}

export const getScoreFromLocalStorage = () => {
	const storageString = secureLocalStorage.getItem('score')
	const score = JSON.parse(storageString as string)
	return Number(score)
}

export const addPointsToLocalStorage = (points: number) => {
	const storageString = secureLocalStorage.getItem('score')
	const score = JSON.parse(storageString as string)
	const updatedScore = points + Number(score)
	secureLocalStorage.setItem('score', JSON.stringify(updatedScore))
}

export const updateKittenInLocalStorage = (
	id: string,
	key: string,
	value: any
) => {
	const storageString = secureLocalStorage.getItem('kittenStorage')
	let existingKittens = JSON.parse(storageString as string)
	for (let i = 0; i < existingKittens.length; i++) {
		if (existingKittens[i].id === id) {
			existingKittens[i][key] = value
			secureLocalStorage.setItem(
				'kittenStorage',
				JSON.stringify([...existingKittens])
			)
		}
	}
}

export const getDisclaimerRead = () => {
	const storageString = secureLocalStorage.getItem('disclaimer')
	const disclaimerRead = JSON.parse(storageString as string)
	return disclaimerRead
}

export const setDisclaimerRead = () => {
	secureLocalStorage.setItem('disclaimer', JSON.stringify(true))
}
