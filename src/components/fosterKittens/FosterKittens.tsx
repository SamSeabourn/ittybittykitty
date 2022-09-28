import React, { useEffect, useState } from 'react'
import Button from '../button'
import OSWindow from '../oswindow'
import { FosterKittenData } from './module'
import './style.css'

interface FosterKittenProps {
	id: string
	isActive: boolean
	setActive: (id: string) => void
	closeWindow: (id: string) => void
}

const FosterKittens = ({
	id,
	isActive,
	setActive,
	closeWindow,
}: FosterKittenProps) => {
	const [fosterKitties, setFosterKitties] = useState([])
	const [currentIndex, setCurrentIndex] = useState(0)

	//TODO: add to preload image script
	useEffect(() => {
		fetch(
			'https://raw.githubusercontent.com/SamSeabourn/CatJSON/main/cats.json'
		)
			.then(res => res.json())
			.then(data => {
				setFosterKitties(data.currentKittens)
			})
	}, [])

	const pageDown = () => {
		if (currentIndex < 1) return
		setCurrentIndex(currentIndex - 1)
	}

	const pageUp = () => {
		if (currentIndex >= fosterKitties.length - 1) return
		setCurrentIndex(currentIndex + 1)
	}

	return (
		<OSWindow
			id={id}
			title='CURRENT FOSTER KITTENS'
			size='medium'
			startingShift={0}
			setActive={setActive}
			isActive={isActive}
			closeWindow={closeWindow}
		>
			<div className='buttons'>
				<Button
					text='< Prev'
					onClickFn={pageDown}
					disabled={currentIndex < 1}
				/>
				<Button
					text='Next >'
					onClickFn={pageUp}
					disabled={currentIndex >= fosterKitties.length - 1}
				/>
			</div>
			<div className='wrapper'>
				{fosterKitties?.map((fk: FosterKittenData, i) => {
					if (currentIndex === i) {
						return (
							<React.Fragment key={i}>
								<div
									className='profile-pic'
									style={{
										backgroundImage: `url("${fk.imgUrl}")`,
									}}
								></div>
								<div className='text--wrapper'>
									<h2>
										{fk.name}{' '}
										{fk.gender === 'male' ? '♂' : '♀'}
									</h2>
									<p>{fk.description}</p>
								</div>
							</React.Fragment>
						)
					} else {
						return null
					}
				})}
			</div>
		</OSWindow>
	)
}

export default FosterKittens
