import { useEffect, useState } from 'react'
import { Kitten } from '../kitty/module'
import CatCarrier from '../catcarrier'
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

const Playground = () => {
	const [startOpen, setStartOpen] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)
	const [showKittens, setShowKittens] = useState<boolean>(true)
	const [kittens, setKittens] = useState<Array<Kitten>>([])
	const [poop, setPoop] = useState<Array<PoopType>>([])
	const [cleanSelected, setCleanSelected] = useState<boolean>(false)

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
	}

	const toggleStart = () => {
		setStartOpen(!startOpen)
	}

	const addKittenToLocalStorage = (newKitten: Kitten) => {
		const storageString = localStorage.getItem('kittenStorage')
		const existingKittens = JSON.parse(storageString as string)
		localStorage.setItem(
			'kittenStorage',
			JSON.stringify([...existingKittens, newKitten])
		)
	}

	const getKittensFromLocalStorage = () => {
		const storageString = localStorage.getItem('kittenStorage')
		const existingKittens = JSON.parse(storageString as string)
		return existingKittens
	}

	const updateKittenInLocalStorage = (
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

	const spawnPoop = (location: number) => {
		if (poop.length >= 2) return //max poop is 20
		const newPoop: PoopType = {
			id: createUUID(),
			location: location + 40,
			stage: 'fresh',
		}
		setPoop(poop => [...poop, newPoop])
	}

	const initLocalStorage = () => {
		if (localStorage.getItem('kittenStorage') === null) {
			localStorage.setItem('kittenStorage', JSON.stringify([]))
		}
	}

	const cleanKitty = (id: string) => {
		if (!cleanSelected) return
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
		setCleanSelected(false)
		document.getElementsByTagName('body')[0].style.cursor = ''
	}

	const selectCleanKitten = () => {
		setCleanSelected(true)
		document.getElementsByTagName(
			'body'
		)[0].style.cursor = `url('${SpongeIcon}'), auto`
	}

	const toggleShowKittens = () => {
		setShowKittens(!showKittens)
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
		]

		Promise.allSettled([...imageSrcs.map(src => preloadImage(src))]).then(
			() => {
				console.log('images fetched')
				initLocalStorage()
				setKittens(getKittensFromLocalStorage())
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
						spawnKitten={spawnKitten}
						cleanSelected={cleanSelected}
						selectCleanKitten={selectCleanKitten}
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
							<Poop key={p.id} location={p.location} />
						))}
					</div>
				</>
			)}
		</div>
	)
}

export default Playground
