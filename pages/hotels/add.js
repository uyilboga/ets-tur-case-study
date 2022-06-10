import Layout from '/layouts/layout'
import {useDispatch} from "react-redux";
import {createHotel} from "/redux/slices/hotelSlice";
import {useState} from "react";
import {useRouter} from "next/router";
import {Check} from "react-feather";

function Add() {
	const router = useRouter();
	const [hotelName, setHotelName] = useState('');
	const [point, setPoint] = useState('')
	const [successMessage, setSuccessMessage] = useState(false);

	const dispatch = useDispatch();

	const handleNameChange = (e) => {
		setHotelName(e.target.value);
	}

	const handlePointChange = (e) => {
		setPoint(e.target.value);
	}

	const handleFormSubmit = async (e) => {
		e.preventDefault()
		await dispatch(createHotel({
			hotelName,
			point
		}))
		await setSuccessMessage(true);
		setTimeout(function () {
			router.push('/')
		}, 2000);
	}

	return (
		<>
			<Layout>
				<div className="add-hotel">
					<h3>Yeni Hotel Ekle</h3>
					<form onSubmit={handleFormSubmit}>
						<div className="form-row">
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label htmlFor="name">Otel Adı</label>
									<input className="form-control" type="text" id="name" value={hotelName} onChange={handleNameChange} placeholder="Otel Adı" required/>
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="form-group">
									<label htmlFor="point">Otel puanı</label>
									<input className="form-control"  type="number" min="0" max="10" id="name" value={point} onChange={handlePointChange} placeholder="Otel Puanı" required/>
								</div>
							</div>
						</div>
						{
							successMessage
							?
							<div className="alert alert-success"><Check className="mr-2"/>Otel Verisi Eklendi</div>
							:
							<button type="submit" className="btn btn-primary">EKLE</button>
						}
					</form>
				</div>
			</Layout>
		</>
	)
}

export default Add;