import './App.css'
import Kitty from './components/kitty'
import Playground from './components/playground/Playground'

function App() {
	return (
		<div className='App'>
			{
				<Playground>
					<Kitty key={'23'} />
					<Kitty key={'24'} />
					<Kitty key={'25'} />
					<Kitty key={'26'} />
					<Kitty key={'27'} />
				</Playground>
			}
		</div>
	)
}

export default App
