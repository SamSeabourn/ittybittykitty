import './style.css'

interface Props {
	text: React.ReactNode
	onClickFn: () => void
}

const Button = ({ text, onClickFn }: Props) => (
	<div onClick={onClickFn} className='button'>
		<span>{text}</span>
	</div>
)

export default Button
