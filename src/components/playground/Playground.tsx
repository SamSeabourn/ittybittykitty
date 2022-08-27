import { useState } from 'react'
import { Kitten } from '../kitty/module'
import CatCarrier from '../catcarrier'
import {
	getColorShift,
	createUUID,
	getKittenColor,
	generateRandomFromRange,
} from '../../helpers'
import StartMenuButton from '../startmenubutton'
import StartMenu from '../startmenu'
import Kitty from '../kitty'
import Window from '../window'
import './style.css'

const Playground = () => {
	const [startOpen, setStartOpen] = useState<boolean>(false)
	const [showKittens, setShowKittens] = useState<boolean>(true)
	const [kittens, setKittens] = useState<Array<Kitten>>([])

	const spawnKitten = () => {
		const kittenColor = getKittenColor()
		const newKitten: Kitten = {
			id: createUUID(),
			color: kittenColor,
			colorShift: getColorShift(kittenColor),
			name: '',
		}
		setKittens(kittens => [...kittens, newKitten])
	}

	const toggleStart = () => {
		setStartOpen(!startOpen)
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
			/>
			<div style={{ opacity: showKittens ? 1 : 0 }}>
				<CatCarrier />
				{kittens.map(k => {
					return (
						<Kitty
							key={k.id}
							name=''
							color={k.color}
							colorShift={k.colorShift}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default Playground
