import OSWindow from '../oswindow'
import './style.css'
interface CreditProps {
	id: string
	isActive: boolean
	setActive: (id: string) => void
	closeWindow: (id: string) => void
}

const Credits = ({ id, isActive, setActive, closeWindow }: CreditProps) => {
	return (
		<OSWindow
			id={id}
			title='CREDITS'
			size='large'
			startingShift={0}
			setActive={setActive}
			isActive={isActive}
			closeWindow={closeWindow}
		>
			<>
				<h1>🐱</h1>
				<h4>Built with love {'<3'}</h4>
				<div>
					<p>Product managed by KittenClubhouse</p>
					<p>Visual design mawrTRON & KittenClubhouse</p>
					<p>Build and Tech design by mawrTRON</p>
					<p>Kitten art Elthen's Pixel Art Shop</p>
				</div>
				<br />
				<p className='flash'>
					if you are a React developer and would like to contribute to
					this project, please reach out to the admins on discord.
				</p>
			</>
		</OSWindow>
	)
}

export default Credits
