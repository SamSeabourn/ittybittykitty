import './animations.css'
import './style.css'

interface Props {
	id: string
	stage?: 'fresh' | 'old' | 'dry'
	location: number
	removePoop: (id: string) => void
}

export const Poop = ({ id, location, removePoop }: Props) => {
	return (
		<div
			className='poop'
			style={{
				backgroundImage: `url('./poop_fresh.png')`,
				left: `${location}px`,
			}}
			onClick={() => removePoop(id)}
		></div>
	)
}

export default Poop
