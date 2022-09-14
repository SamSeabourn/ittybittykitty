import './style.css'

interface Props {
	children: React.ReactNode
}

const Button = ({ children }: Props) => (
	<div className='button'>
		<span>{children}</span>
	</div>
)

export default Button
