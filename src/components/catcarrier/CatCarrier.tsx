import './style.css'
import CarrierBottom from './CarrierBottom.png'
import CarrierTop from './CarrierTop.png'

const CatCarrier = () => {
	return (
		<div className='carrier-wrapper'>
			<div className='carrier-bottom'>
				<img src={CarrierBottom} />
			</div>
			<div className='carrier-top'>
				<img src={CarrierTop} />
			</div>
		</div>
	)
}

export default CatCarrier
