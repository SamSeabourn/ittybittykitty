import { useState } from 'react'
import StartMenuOption from '../startmenuoption/StartMenuOption'
import CatOSLogo from './cat_os97.png'
import ShowHideIcon from './togglecat.png'
import GetKittyIcon from './getkitty.png'
import SpongeWaterIcon from './sponge.png'
import WaterIcon from './sponge_water.png'
import ScoreIcon from './score_icon.png'
import './style.css'
import Timer from '../timer'

interface Props {
	startOpen: boolean
	toggleStart: () => void
	showKittens: boolean
	toggleShowKittens: () => void
	spawnKitten: () => void
	cleanSelected: boolean
	selectCleanKitten: () => void
	openScore: () => void
}

const StartMenu = ({
	startOpen,
	showKittens,
	toggleShowKittens,
	toggleStart,
	spawnKitten,
	cleanSelected,
	selectCleanKitten,
	openScore,
}: Props) => {
	const kittySpanTime = 2 * 60 * 60
	const [isGetKittyAvaliable, setIsKittyAvaliable] = useState(false)
	const [kittyWaitDuration, setKittyWaitDuration] = useState(kittySpanTime)

	const handleHideKittens = () => {
		toggleShowKittens()
	}

	const handleSelectClean = () => {
		document.body.style.cursor = `wait`
		selectCleanKitten()
	}

	const handleSpawnKitten = () => {
		spawnKitten()
		setKittyWaitDuration(kittySpanTime)
		setIsKittyAvaliable(false)
	}

	return (
		<div
			style={{ display: startOpen ? 'unset' : 'none' }}
			className='start-container'
			// onMouseLeave={toggleStart}
		>
			<div className='start-logobar'>
				<img src={CatOSLogo} />
			</div>
			<div className='divider' />
			<StartMenuOption
				icon={GetKittyIcon}
				optionFunction={handleSpawnKitten}
				isActive={isGetKittyAvaliable}
			>
				{isGetKittyAvaliable ? (
					'Get Itty Bitty Kitty'
				) : (
					<Timer
						kittyWaitDuration={kittyWaitDuration}
						setKittyWaitDuration={setKittyWaitDuration}
						setIsKittyAvaliable={setIsKittyAvaliable}
					/>
				)}
			</StartMenuOption>
			<div className='divider' />
			<StartMenuOption
				icon={cleanSelected ? WaterIcon : SpongeWaterIcon}
				optionFunction={handleSelectClean}
				isActive={true}
			>
				Clean
			</StartMenuOption>
			<div className='divider' />
			<StartMenuOption
				icon={ScoreIcon}
				optionFunction={openScore}
				isActive={true}
			>
				Show Score
			</StartMenuOption>
			<div className='divider' />
			<StartMenuOption
				icon={ShowHideIcon}
				optionFunction={handleHideKittens}
				isActive={true}
			>
				{showKittens ? 'Hide Kittens' : 'Show Kittens'}
			</StartMenuOption>
			<div className='divider' />
		</div>
	)
}

export default StartMenu
