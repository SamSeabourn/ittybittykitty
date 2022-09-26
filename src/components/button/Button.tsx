import './style.css'

interface Props {
	text: React.ReactNode
	onClickFn: () => void
	disabled?: boolean
}

const Button = ({ text, onClickFn, disabled = false }: Props) => {
	const handleClick = () => {
		if (disabled) return
		onClickFn()
	}

	return (
		<div
			onClick={handleClick}
			className={`button ${disabled ? 'disabled' : ''}`}
		>
			<span>{text}</span>
		</div>
	)
}

export default Button
