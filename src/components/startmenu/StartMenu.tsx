import { useState } from 'react'
import StartMenuOption from '../startmenuoption/StartMenuOption'
import CatalogIcon from './catalog.png'
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
	kittenAvaliable: boolean
	spawnKitten: () => void
	cleanSelected: boolean
	selectCleanKitten: () => void
	showScore: boolean
	openScore: () => void
}

const StartMenu = ({
	startOpen,
	showKittens,
	toggleShowKittens,
	toggleStart,
	kittenAvaliable,
	spawnKitten,
	cleanSelected,
	selectCleanKitten,
	showScore,
	openScore,
}: Props) => {
	const [isGetKittyAvaliable, setIsKittyAvaliable] = useState(false)

	const handleHideKittens = () => {
		toggleShowKittens()
	}

	const handleSelectClean = () => {
		document.body.style.cursor = `wait`
		selectCleanKitten()
	}

	return (
		<div
			style={{ display: startOpen ? 'unset' : 'unset' }}
			className='start-container'
			onMouseLeave={toggleStart}
		>
			<div className='start-logobar'>
				<img src={CatOSLogo} />
			</div>
			<div className='divider' />
			<StartMenuOption
				icon={GetKittyIcon}
				optionFunction={spawnKitten}
				isActive={isGetKittyAvaliable}
			>
				{isGetKittyAvaliable ? (
					'Get Itty Bitty Kitty'
				) : (
					<Timer
						duration={6}
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
