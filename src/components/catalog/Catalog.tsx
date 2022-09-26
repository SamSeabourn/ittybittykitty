import { useEffect, useState } from 'react'
import Button from '../button'
import OSWindow from '../oswindow'
import './style.css'
interface ScoreProps {
	id: string
	isActive: boolean
	setActive: (id: string) => void
	closeWindow: (id: string) => void
}

const Catalog = ({ id, isActive, setActive, closeWindow }: ScoreProps) => {
	const [fosterKitties, setFosterKitties] = useState([])
	const [currentIndex, setCurrentIndex] = useState(0)

	useEffect(() => {
		fetch(
			'https://raw.githubusercontent.com/SamSeabourn/CatJSON/main/cats.json'
		)
			.then(res => res.json())
			.then(data => {
				console.log()
				setFosterKitties(data.currentKittens)
			})
	}, [])

	return (
		<OSWindow
			id={id}
			title='SCORE'
			size='medium'
			startingShift={0}
			setActive={setActive}
			isActive={isActive}
			closeWindow={closeWindow}
		>
			<div>
				{fosterKitties?.map((fk: any, i) => {
					if (currentIndex === i) {
						return (
							<>
								<div>
									<h2>{fk.name}</h2>
									<div
										className='profile-pic'
										style={{
											backgroundImage: `url("${fk.imageUrl}")`,
										}}
									></div>
									<p>{fk.description}</p>
								</div>
								<div className='buttons'>
									<Button
										text='Prev'
										onClickFn={console.log}
									/>
									<Button
										text='Next'
										onClickFn={console.log}
									/>
								</div>
							</>
						)
					} else {
						return null
					}
				})}
			</div>
		</OSWindow>
	)
}

export default Catalog
