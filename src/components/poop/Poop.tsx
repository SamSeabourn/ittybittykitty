import './animations.css'
import './style.css'

interface Props {
	stage?: 'fresh' | 'old' | 'dry'
	location: number
}

export const Poop = ({ location }: Props) => {
	return (
		<div
			className='poop'
			style={{
				backgroundImage: `url('./poop_fresh.png')`,
				left: `${location}px`,
			}}
		></div>
	)
}

export default Poop
