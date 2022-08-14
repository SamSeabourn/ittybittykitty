import './App.css'
import Kitty from './components/kitty'
import Playground from './components/playground/Playground'

function App() {
	return (
		<div className='App'>
			{
				<Playground>
					<Kitty />
					<Kitty />
					<Kitty />
					<Kitty />
				</Playground>
			}
		</div>
	)
}

export default App
