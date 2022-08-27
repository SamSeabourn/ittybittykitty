import StartMenuOption from '../startmenuoption/StartMenuOption'
import CatalogIcon from './catalog.png'
import CatOSLogo from './cat_os97.png'
import './style.css'

const StartMenu = () => {
	return (
		<div className='start--container'>
			<div className='start--logobar'>
				<img src={CatOSLogo} />
			</div>
			<hr className='divider' />
			<StartMenuOption icon={CatalogIcon}>
				<div>Catalog</div>
			</StartMenuOption>
			<hr className='divider' />
		</div>
	)
}

export default StartMenu
