import { useState } from 'react'
import StartMenuOption from '../startmenuoption/StartMenuOption'
import CatOSLogo from './cat_os97.png'
import ShowHideIcon from './togglecat.png'
import GetKittyIcon from './getkitty.png'
import SpongeWaterIcon from './sponge.png'
import WaterIcon from './sponge_water.png'
import ScoreIcon from './score_icon.png'
import FormatCIcon from './format.png'
import FosterIcon from './fosters.png'
import ArrowIcon from './arrow.png'
import CreditIcon from './lisa.png'
import './style.css'
import Timer from '../timer'
import { KITTEN_SPAWN_TIME } from '../constants'

interface Props {
	startOpen: boolean
	toggleStart: () => void
	showKittens: boolean
	toggleShowKittens: () => void
	spawnKitten: () => void
	cleanSelected: boolean
	selectCleanKitten: () => void
	openScore: () => void
	openFormatC: () => void
	openFosterKittens: () => void
	openCredits: () => void
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
	openFormatC,
	openFosterKittens,
	openCredits,
}: Props) => {
	const [isGetKittyAvaliable, setIsKittyAvaliable] = useState(false)
	const [kittyWaitDuration, setKittyWaitDuration] =
		useState(KITTEN_SPAWN_TIME)

	const handleFosterKittens = () => {
		openFosterKittens()
	}

	const handleHideKittens = () => {
		toggleShowKittens()
	}

	const handleSelectClean = () => {
		document.body.style.cursor = `wait`
		selectCleanKitten()
	}

	const handleCredits = () => {
		openCredits()
	}

	const handleSpawnKitten = () => {
		spawnKitten()
		setKittyWaitDuration(KITTEN_SPAWN_TIME)
		setIsKittyAvaliable(false)
	}

	return (
		<div
			style={{ left: startOpen ? '0.02%' : '-15.75%' }}
			className='start-container'
		>
			<div className='start-logobar'>
				<img src={CatOSLogo} />
			</div>

			<div className='divider' />
			<StartMenuOption
				icon={FosterIcon}
				optionFunction={handleFosterKittens}
				isActive={true}
			>
				Show Current Foster Kittens
			</StartMenuOption>
			<div className='divider' />
			<StartMenuOption
				icon={GetKittyIcon}
				optionFunction={handleSpawnKitten}
				isActive={isGetKittyAvaliable}
			>
				{isGetKittyAvaliable ? (
					'Foster virtual kitten'
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
			<StartMenuOption
				icon={CreditIcon}
				optionFunction={handleCredits}
				isActive={true}
			>
				Credits
			</StartMenuOption>
			<div className='divider' />
			<StartMenuOption
				icon={FormatCIcon}
				optionFunction={openFormatC}
				isActive={true}
			>
				Format C:
			</StartMenuOption>
			<div className='open-tab' onClick={toggleStart}>
				<div className='open-tab--arrow'>
					<img className={startOpen ? 'open' : ''} src={ArrowIcon} />
				</div>
			</div>
		</div>
	)
}

export default StartMenu
