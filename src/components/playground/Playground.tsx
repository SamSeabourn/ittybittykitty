import CatCarrier from '../catcarrier'
import Kitty from '../kitty'
import Window from '../window'
import './style.css'

const Playground = () => {
	// const [kittens, SetKittens] = useState<Array<

	return (
		<div className='playground'>
			<Window>
				<div>
					<p>Test contents </p>
				</div>
			</Window>
			<CatCarrier />
			<Kitty key={'23'} color='white' />
			<Kitty key={'24'} color='white' />
			<Kitty key={'25'} color='white' />
			<Kitty key={'26'} color='white' />
			<Kitty key={'27'} color='white' />
			<Kitty key={'28'} color='white' />
			<Kitty key={'28'} color='black' />
			<Kitty key={'28'} color='white' />
			<Kitty key={'27'} color='white' />
			<Kitty key={'28'} color='white' />
			<Kitty key={'28'} color='white' />
			<Kitty key={'28'} color='white' />
		</div>
	)
}

export default Playground
