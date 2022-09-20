import Button from '../button'
import { getDisclaimerRead, setDisclaimerRead } from '../localStorage'
import OSWindow from '../oswindow'

interface DisclaimerProps {
	id: string
	isActive: boolean
	setActive: (id: string) => void
	closeWindow: (id: string) => void
}

const Disclaimer = ({
	id,
	isActive,
	setActive,
	closeWindow,
}: DisclaimerProps) => {
	if (getDisclaimerRead()) return null

	const handleGotIt = () => {
		setDisclaimerRead()
		closeWindow(id)
	}

	return (
		<OSWindow
			id={id}
			title='DISCLAIMER'
			size='medium'
			startingShift={10}
			setActive={setActive}
			isActive={isActive}
			closeWindow={closeWindow}
			hideClose={true}
		>
			<h3>Welcome to CatOS '97'</h3>
			<p>
				CatOS 97 is a work in progress and currently in beta. There is
				no backend at the moment and your kittens are saved on your
				computer. This means if you clear your cookies and local storage
				you will also clear your kitties. You have been warned. Please
				enjoy the app and let us know in the discord if there are any
				bugs or any improvments to make.
			</p>
			<Button text='Got it' onClickFn={handleGotIt} />
		</OSWindow>
	)
}

export default Disclaimer
