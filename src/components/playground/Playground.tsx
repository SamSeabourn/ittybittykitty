import React from 'react'
import CatCarrier from '../catcarrier'
import StartMenuButton from '../startmenubutton'
import StartMenu from '../startmenu'
import Kitty from '../kitty'
import Window from '../window'
import './style.css'

const Playground = () => {
	// const [kittens, SetKittens] = useState<Array<

	return (
		<div className='playground'>
			<StartMenuButton />
			<StartMenu />
			<CatCarrier />
			<Kitty key={'22'} name='steve' color='white' />
			<Kitty key={'23'} name='steve' color='clear' />
			<Kitty key={'24'} name='murray' color='black' />{' '}
		</div>
	)
}

export default Playground
