import StartMenuOption from '../startmenuoption/StartMenuOption'
import CatalogIcon from './catalog.png'
import CatOSLogo from './cat_os97.png'
import ShowHideIcon from './togglecat.png'
import GetKittyIcon from './getkitty.png'
import SpongeWaterIcon from './sponge.png'
import WaterIcon from './sponge_water.png'
import './style.css'

interface Props {
	startOpen: boolean
	toggleStart: () => void
	showKittens: boolean
	toggleShowKittens: () => void
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
	spawnKitten,
	cleanSelected,
	selectCleanKitten,
	showScore,
	openScore,
}: Props) => {
	const handleHideKittens = () => {
		toggleShowKittens()
	}

	const handleSelectClean = () => {
		document.body.style.cursor = `wait`
		selectCleanKitten()
	}

	return (
		<div
			style={{ display: startOpen ? 'unset' : 'none' }}
			className='start-container'
			onMouseLeave={toggleStart}
		>
			<div className='start-logobar'>
				<img src={CatOSLogo} />
			</div>
			<hr className='divider' />
			<StartMenuOption icon={GetKittyIcon} optionFunction={spawnKitten}>
				Get Itty Bitty Kitty
			</StartMenuOption>
			<hr className='divider' />
			<StartMenuOption
				icon={cleanSelected ? WaterIcon : SpongeWaterIcon}
				optionFunction={handleSelectClean}
			>
				Clean
			</StartMenuOption>
			<hr className='divider' />
			<StartMenuOption
				icon={cleanSelected ? WaterIcon : SpongeWaterIcon}
				optionFunction={openScore}
			>
				{showScore ? 'Show Score' : 'Hide Score'}
			</StartMenuOption>
			<hr className='divider' />
			{/* <StartMenuOption icon={CatalogIcon}>Catalog</StartMenuOption>
			<hr className='divider' /> */}
			<StartMenuOption
				icon={ShowHideIcon}
				optionFunction={handleHideKittens}
			>
				{showKittens ? 'Hide Kittens' : 'Show Kittens'}
			</StartMenuOption>
			<hr className='divider' />
		</div>
	)
}

export default StartMenu
