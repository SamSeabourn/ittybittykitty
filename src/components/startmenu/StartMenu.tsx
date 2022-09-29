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
	openFormatC: () => void
	openFosterKittens: () => void
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
}: Props) => {
	const kittySpanTime = 5 //TODO: Move to config
	const [isGetKittyAvaliable, setIsKittyAvaliable] = useState(false)
	const [kittyWaitDuration, setKittyWaitDuration] = useState(kittySpanTime)

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

	const handleSpawnKitten = () => {
		spawnKitten()
		setKittyWaitDuration(kittySpanTime)
		setIsKittyAvaliable(false)
	}

	return (
		<div
			style={{ left: startOpen ? '-4px' : '-264px' }}
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
				icon={FormatCIcon}
				optionFunction={openFormatC}
				isActive={true}
			>
				Format C:
			</StartMenuOption>
			<div className='open-tab' onClick={toggleStart}>
				<div className='open-tab--arrow'>
					<img src={ArrowIcon} className={startOpen ? 'open' : ''} />
				</div>
			</div>
		</div>
	)
}

export default StartMenu
