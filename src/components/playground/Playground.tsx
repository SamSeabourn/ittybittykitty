//TODO: split this bad boy up, shes getting chonky
import { useEffect, useState } from 'react'
import { Kitten } from '../kitty/module'
import CatCarrier from '../catcarrier'
import secureLocalStorage from 'react-secure-storage'
import {
	getColorShift,
	createUUID,
	getKittenColor,
	preloadImage,
} from '../../helpers'
import StartMenuButton from '../startmenubutton'
import StartMenu from '../startmenu'
import Kitty from '../kitty'
import SpongeIcon from '../startmenu/sponge_solo.png'
import Poop from '../poop'
import './style.css'
import { PoopType } from '../poop/module'
import Score from '../score/Score'
import Disclaimer from '../disclaimer'
import { SCORE } from '../score/constants'
import { avaliableWindows } from './allWindows'

interface OSWindow {
	id: string
	isOpen: boolean
	isActive: boolean
}

const Playground = () => {
	const [startOpen, setStartOpen] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)
	const [showKittens, setShowKittens] = useState<boolean>(true)
	const [kittens, setKittens] = useState<Array<Kitten>>([])
	const [poop, setPoop] = useState<Array<PoopType>>([])
	const [cleanSelected, setCleanSelected] = useState<boolean>(false)
	const [kittenAvalable, setKittenAvalable] = useState<boolean>(false)
	const [score, setScore] = useState<number>(0)
	const [allWindows, setAllWindows] =
		useState<Array<OSWindow>>(avaliableWindows)

	const addToScore = (points: number) => {
		const newScore = score + points
		addPointsToLocalStorage(points)
		setScore(newScore)
	}

	const spawnKitten = () => {
		const kittenColor = getKittenColor()
		const newKitten: Kitten = {
			id: createUUID(),
			color: kittenColor,
			colorShift: getColorShift(kittenColor),
			name: '',
			isClean: false,
		}
		setKittens(kittens => [...kittens, newKitten])
		addKittenToLocalStorage(newKitten)
		addToScore(SCORE.GET_KITTEN)
	}

	const toggleStart = () => {
		setStartOpen(!startOpen)
	}

	const initLocalStorage = () => {
		if (secureLocalStorage.getItem('kittenStorage') === null) {
			secureLocalStorage.setItem('kittenStorage', JSON.stringify([]))
		}
		if (secureLocalStorage.getItem('score') === null) {
			secureLocalStorage.setItem('score', JSON.stringify(0))
		}
	}

	const addKittenToLocalStorage = (newKitten: Kitten) => {
		const storageString = secureLocalStorage.getItem('kittenStorage')
		const existingKittens = JSON.parse(storageString as string)
		secureLocalStorage.setItem(
			'kittenStorage',
			JSON.stringify([...existingKittens, newKitten])
		)
	}

	const getKittensFromLocalStorage = () => {
		const storageString = secureLocalStorage.getItem('kittenStorage')
		const existingKittens = JSON.parse(storageString as string)
		return existingKittens
	}

	const getScoreFromLocalStorage = () => {
		const storageString = secureLocalStorage.getItem('score')
		const score = JSON.parse(storageString as string)
		return Number(score)
	}

	const addPointsToLocalStorage = (points: number) => {
		const storageString = secureLocalStorage.getItem('score')
		const score = JSON.parse(storageString as string)
		const updatedScore = points + Number(score)
		secureLocalStorage.setItem('score', JSON.stringify(updatedScore))
	}

	const updateKittenInLocalStorage = (
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

	const spawnPoop = (location: number) => {
		if (poop.length >= 2) return //max poop is 20 TODO: this is broken somehow
		const newPoop: PoopType = {
			id: createUUID(),
			location: location + 40,
			stage: 'fresh',
		}
		setPoop(poop => [...poop, newPoop])
	}

	const removePoop = (id: string) => {
		const newState = poop.filter(p => p.id !== id)
		addToScore(SCORE.CLEAN_POOP)
		setPoop(newState)
	}

	const cleanKitty = (id: string) => {
		if (!cleanSelected) return
		const selectedKitten = kittens.find(k => k.id === id)
		if (selectedKitten?.isClean) return
		addToScore(SCORE.CLEAN_KITTEN)
		let allKittens = kittens
		for (let i = 0; i < allKittens.length; i++) {
			if (allKittens[i].id === id) {
				const updatedKitten = allKittens[i]
				updatedKitten.isClean = true
				allKittens[i] = updatedKitten
				updateKittenInLocalStorage(id, 'isClean', true)
				setKittens([...allKittens])
			}
		}
	}

	const selectCleanKitten = () => {
		setCleanSelected(!cleanSelected)
		document.getElementsByTagName('body')[0].style.cursor = !cleanSelected
			? `url('${SpongeIcon}'), auto`
			: ''
	}

	const toggleShowKittens = () => {
		setShowKittens(!showKittens)
	}

	const setActive = (id: string) => {
		const updatedState = allWindows.map(w => {
			if (w.id === id) {
				w.isActive = true
				return w
			}
			w.isActive = false
			return w
		})
		setAllWindows(updatedState)
	}

	const closeWindow = (id: string) => {
		const updatedState = allWindows.map(w => {
			if (w.id === id) {
				w.isOpen = false
			}
			return w
		})
		setAllWindows(updatedState)
	}

	const setWindowOpen = (id: string, isOpen: boolean) => {
		const updatedState = allWindows.map(w => {
			if (w.id === id) {
				w.isOpen = isOpen
				w.isActive = true
				return w
			}
			w.isActive = false
			return w
		})
		setAllWindows(updatedState)
	}

	useEffect(() => {
		//TODO: Webpack this bit
		const imageSrcs = [
			'poop_fresh.png',
			'sponge.png',
			'sprites_black.png',
			'sprites_clear.png',
			'sprites_dirty.png',
			'sprites_gold.png',
			'sprites_neon.png',
			'sprites_normal.png',
			'sprites_white.png',
			'sponge_solo.png',
			'sponge_water.png',
			'sponge.png',
			'CarrierBottom.png',
			'CarrierTop.png',
			'cat_os97.png',
			'getkitty.png',
			'catalog.png',
			'score_icon.png',
		]

		Promise.allSettled([...imageSrcs.map(src => preloadImage(src))]).then(
			() => {
				initLocalStorage()
				setKittens(getKittensFromLocalStorage())
				setScore(getScoreFromLocalStorage())
				setLoading(false)
			}
		)
	}, [])

	return (
		<div className='playground'>
			{loading ? (
				<p>loading</p>
			) : (
				<>
					<StartMenuButton
						startOpen={startOpen}
						toggleStart={toggleStart}
					/>
					<StartMenu
						startOpen={startOpen}
						toggleStart={toggleStart}
						showKittens={showKittens}
						toggleShowKittens={toggleShowKittens}
						kittenAvaliable={kittenAvalable}
						spawnKitten={spawnKitten}
						cleanSelected={cleanSelected}
						selectCleanKitten={selectCleanKitten}
						showScore={true}
						openScore={() => setWindowOpen('score', true)}
					/>
					<div style={{ opacity: showKittens ? 1 : 0 }}>
						<CatCarrier />
						{kittens.map(k => (
							<Kitty
								id={k.id}
								key={k.id}
								name=''
								color={k.color}
								colorShift={k.colorShift}
								cleanKitty={cleanKitty}
								isClean={k.isClean}
								spawnPoop={spawnPoop}
							/>
						))}
						{poop.map(p => (
							<Poop
								id={p.id}
								key={p.id}
								location={p.location}
								removePoop={removePoop}
							/>
						))}
					</div>
					{allWindows.map(ow => {
						if (ow.id === 'score' && ow.isOpen) {
							return (
								<Score
									id={ow.id}
									key={ow.id}
									isActive={ow.isActive}
									setActive={setActive}
									closeWindow={closeWindow}
									score={score}
								/>
							)
						}
						if (ow.id === 'disclaimer' && ow.isOpen) {
							return (
								<Disclaimer
									id={ow.id}
									key={ow.id}
									isActive={ow.isActive}
									setActive={setActive}
									closeWindow={closeWindow}
								/>
							)
						}
					})}
				</>
			)}
		</div>
	)
}

export default Playground
