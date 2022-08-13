import './style.css'

type Props = {
	children: any
}

const Playground = ({ children }: Props) => {
	return <div className='playground'>{children}</div>
}

export default Playground
