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
		>
			<span>Hi Im the disclaimer</span>
		</OSWindow>
	)
}

export default Disclaimer