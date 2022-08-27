import StartMenuOption from '../startmenuoption/StartMenuOption'
import CatalogIcon from './catalog.png'
import CatOSLogo from './cat_os97.png'
import ShowHideIcon from './togglecat.png'
import GetKittyIcon from './getkitty.png'
import './style.css'

interface Props {
	startOpen: boolean
	toggleStart: () => void
	showKittens: boolean
	toggleShowKittens: () => void
	spawnKitten: () => void
}

const StartMenu = ({
	startOpen,
	showKittens,
	toggleShowKittens,
	toggleStart,
	spawnKitten,
}: Props) => {
	const handleHideKittens = () => {
		toggleShowKittens()
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
				<div>Get Itty Bitty Kitty</div>
			</StartMenuOption>
			<hr className='divider' />
			<StartMenuOption icon={CatalogIcon}>
				<div>Catalog</div>
			</StartMenuOption>
			<hr className='divider' />
			<StartMenuOption
				icon={ShowHideIcon}
				optionFunction={handleHideKittens}
			>
				<div>{showKittens ? 'Hide Kittens' : 'Show Kittens'}</div>
			</StartMenuOption>
			<hr className='divider' />
		</div>
	)
}

export default StartMenu
