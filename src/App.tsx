import './App.css'
import Playground from './components/playground/Playground'

document.addEventListener(
	'dblclick',
	event => {
		event.preventDefault()
		event.stopPropagation()
	},
	true
)

function App() {
	return (
		<div className='App'>
			<Playground />
		</div>
	)
}

export default App
