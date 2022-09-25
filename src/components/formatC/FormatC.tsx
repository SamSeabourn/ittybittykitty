import Button from '../button'
import { Kitten } from '../kitty/module'
import { PoopType } from '../poop/module'
import OSWindow from '../oswindow'
import { initLocalStorage } from '../localStorage'

interface FormatCProps {
	id: string
	isActive: boolean
	setActive: (id: string) => void
	closeWindow: (id: string) => void
	resetState: () => void
}

const FormatC = ({
	id,
	isActive,
	setActive,
	closeWindow,
	resetState,
}: FormatCProps) => {
	return (
		<OSWindow
			id={id}
			title='FORMAT C:'
			size='medium'
			startingShift={10}
			setActive={setActive}
			isActive={isActive}
			closeWindow={() => closeWindow('formatC')}
		>
			<h3>FORMAT C:</h3>
			<p>
				IS there just too many kitties on screen and its slowing things
				down. Firstly congrats, that is no easy feat to do. Click below
				to delete local storage and remove all of you kittens. This
				feature will be replaced with the ability to adopt out your
				kitties in the future.
			</p>
			<Button text='Refresh CatOS now' onClickFn={resetState} />
		</OSWindow>
	)
}

export default FormatC
