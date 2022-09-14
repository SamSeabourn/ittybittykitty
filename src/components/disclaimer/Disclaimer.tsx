import Button from '../button'
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
				no backend at the moment and your kittens are save in local
				storage. This means if you clear your cookies and local storage
				for this website you will also clear your kitties. You have been
				warned. Please enjoy the app and let us know in the discord if
				there are any bugs or improments to make.
			</p>

			<Button>Got it</Button>
		</OSWindow>
	)
}

export default Disclaimer
