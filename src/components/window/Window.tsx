import Draggable from 'react-draggable'
import './style.css'

type Props = {
	children: React.ReactNode
}

const Window = ({ children }: Props) => {
	return (
		<Draggable //TODO remove library
			handle='.handle'
			defaultPosition={{ x: 0, y: 0 }}
			scale={1}
			onStart={() => console.log('x')}
			onDrag={() => console.log('x')}
			onStop={() => console.log('x')}
		>
			<div className='window-container'>
				<div className='handle'>
					<div className='topbar'></div>
				</div>
				<div>{children}</div>
			</div>
		</Draggable>
	)
}

export default Window
