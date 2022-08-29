import { useState } from 'react'
import { Kitten } from '../kitty/module'
import CatCarrier from '../catcarrier'
import { getColorShift, createUUID, getKittenColor } from '../../helpers'
import StartMenuButton from '../startmenubutton'
import StartMenu from '../startmenu'
import Kitty from '../kitty'
// import Window from '../window'
import './style.css'

const Playground = () => {
	const [startOpen, setStartOpen] = useState<boolean>(false)
	const [showKittens, setShowKittens] = useState<boolean>(true)
	const [kittens, setKittens] = useState<Array<Kitten>>([])
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
	}

	const toggleStart = () => {
		setStartOpen(!startOpen)
	}

	const selectCleanKitten = () => {
		setCleanSelected(true)
	}

	const toggleShowKittens = () => {
		setShowKittens(!showKittens)
	}

	return (
		<div className='playground'>
			<StartMenuButton startOpen={startOpen} toggleStart={toggleStart} />
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
				{kittens.map(k => {
					return (
						<Kitty
							id={k.id}
							key={k.id}
							name=''
							color={k.color}
							colorShift={k.colorShift}
							isClean={k.isClean}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default Playground
