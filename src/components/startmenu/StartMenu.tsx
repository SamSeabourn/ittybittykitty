import React from 'react'
import StartMenuOption from '../startmenuoption/StartMenuOption'
//@ts-ignore
import CatalogIcon from './catalog.png'
import './style.css'

const StartMenu = () => {
	return (
		<div className='start--container'>
			<div className='start--logobar' />
			<hr className='divider' />
			<StartMenuOption icon={CatalogIcon}>
				<div>Catalog</div>
			</StartMenuOption>
			<hr className='divider' />
		</div>
	)
}

export default StartMenu
