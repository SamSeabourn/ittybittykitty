//TODO: split this bad boy up, shes getting chonky
import React, { useEffect, useState } from 'react'
import { Kitten } from '../kitty/module'
import CatCarrier from '../catcarrier'
import FosterKittens from '../fosterKittens'
import {
	initLocalStorage,
	addKittenToLocalStorage,
	getKittensFromLocalStorage,
	getScoreFromLocalStorage,
	addPointsToLocalStorage,
	updateKittenInLocalStorage,
} from '../localStorage'
import {
	getColorShift,
	createUUID,
	getKittenColor,
	preloadImage,
	generateRandomFromRange,
} from '../../helpers'
import StartMenu from '../startmenu'
import Kitty from '../kitty'
import BlueScreen from '../bluescreen'
import SpongeIcon from '../startmenu/sponge_solo.png'
import Poop from '../poop'
import { PoopType } from '../poop/module'
import Score from '../score/Score'
import Disclaimer from '../disclaimer'
import { SCORE, IMG_SRC_FOR_PRELOAD } from '../constants'
import { availableWindows } from './allWindows'
import { randomCatName } from '../../randomNames'
import FormatC from '../formatC/FormatC'
import './style.css'
import Credits from '../credits/Credits'

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
	const [score, setScore] = useState<number>(0)
	const [blueScreenOpen, setBlueScreenOpen] = useState(false)
	const [allWindows, setAllWindows] =
		useState<Array<OSWindow>>(availableWindows)
	const [pageVisible, setPageVisible] = useState(true)

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
			name: randomCatName[
				generateRandomFromRange(0, randomCatName.length)
			],
			isClean: false,
			birthDay: new Date(),
		}
		setKittens(kittens => [...kittens, newKitten])
		addKittenToLocalStorage(newKitten)
		addToScore(SCORE.GET_KITTEN)
	}

	const spawnPoop = (location: number) => {
		if (poop.length >= 2 && cleanSelected) return //max poop is 20 TODO: this is broken somehow
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

	const setWindowOpen = (id: string) => {
		const updatedState = allWindows.map(w => {
			if (w.id === id) {
				w.isOpen = true
				w.isActive = true
				return w
			}
			w.isActive = false
			return w
		})
		setAllWindows(updatedState)
	}

	const handleBackgroundClick = (e: React.MouseEvent) => {
		const target = e.target as HTMLElement
		if (target.id === 'playground') {
			setStartOpen(false)
		}
	}

	const handleStartOpen = () => {
		setStartOpen(!startOpen)
		setWindowOpen('disclaimer')
	}

	const resetState = () => {
		setBlueScreenOpen(true)
		setStartOpen(false)
		window.setTimeout(() => {
			localStorage.clear()
			initLocalStorage()
			setKittens([])
			setPoop([])
			setAllWindows(availableWindows)
			setBlueScreenOpen(false)
			setWindowOpen('disclaimer')
		}, 9000)
	}

	useEffect(() => {
		Promise.all([
			...IMG_SRC_FOR_PRELOAD.map(src => preloadImage(src)),
		]).then(() => {
			initLocalStorage()
			setKittens(getKittensFromLocalStorage())
			setScore(getScoreFromLocalStorage())
			setLoading(false)
		})

		document.addEventListener('visibilitychange', e => {
			if (document.hidden) {
				setKittens([])
			} else {
				setKittens(getKittensFromLocalStorage())
			}
		})
	}, [])

	return (
		<>
			<div
				className='playground'
				id='playground'
				onClick={e => handleBackgroundClick(e)}
			>
				{loading ? (
					<p>loading</p>
				) : (
					<>
						<StartMenu
							startOpen={startOpen}
							toggleStart={handleStartOpen}
							showKittens={showKittens}
							toggleShowKittens={toggleShowKittens}
							spawnKitten={spawnKitten}
							cleanSelected={cleanSelected}
							selectCleanKitten={selectCleanKitten}
							openScore={() => setWindowOpen('score')}
							openFormatC={() => setWindowOpen('formatC')}
							openFosterKittens={() =>
								setWindowOpen('fosterKittens')
							}
							openCredits={() => setWindowOpen('credits')}
						/>
						<div style={{ opacity: showKittens ? 1 : 0 }}>
							<CatCarrier />
							{kittens.map(k => {
								return (
									<Kitty
										id={k.id}
										key={k.id}
										name={k.name}
										birthday={k.birthDay}
										color={k.color}
										colorShift={k.colorShift}
										cleanKitty={cleanKitty}
										isClean={k.isClean}
										spawnPoop={spawnPoop}
									/>
								)
							})}
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
										spawnKitten={spawnKitten}
										setActive={setActive}
										closeWindow={closeWindow}
									/>
								)
							}
							if (ow.id === 'formatC' && ow.isOpen) {
								return (
									<FormatC
										id={ow.id}
										key={ow.id}
										isActive={ow.isActive}
										setActive={setActive}
										resetState={resetState}
										closeWindow={closeWindow}
									/>
								)
							}
							if (ow.id === 'fosterKittens' && ow.isOpen) {
								return (
									<FosterKittens
										id={ow.id}
										key={ow.id}
										isActive={ow.isActive}
										setActive={setActive}
										closeWindow={closeWindow}
									/>
								)
							}
							if (ow.id === 'credits' && ow.isOpen) {
								return (
									<Credits
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
			<BlueScreen isOpen={blueScreenOpen} />
		</>
	)
}

export default Playground
