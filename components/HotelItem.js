import {X} from "react-feather";

function HotelItem({item, deleteSelectedHotel, increasePoint, decreasePoint}) {
	return (
		<>
			<div className="hotel-item">
				<span className="close-button" onClick={() => deleteSelectedHotel(item.id)}><X/></span>
				<div className="hotel-image">
					<img src={item.image} alt=""/>
				</div>
				<div className="hotel-content">
					<div className="content">
						<h3>{item.name}</h3>
						<span className="point text-success btn">{item.point} Puan</span>
						<div className="d-flex">
							<button className="btn btn-outline-primary" onClick={() => increasePoint(item.id)}>PUAN ARTTIR</button>
							<button className="btn btn-outline-primary ml-2" onClick={() => decreasePoint(item.id)}>PUAN AZALT</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default HotelItem;