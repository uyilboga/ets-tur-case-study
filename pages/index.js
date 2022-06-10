import Layout from '/layouts/layout'
import {useEffect, useState} from "react";
import Link from "next/link";
import {Plus, X, Info} from "react-feather";
import Pagination from '/components/Pagination'
import HotelItem from "/components/HotelItem";
import Swal from "sweetalert2";

export default function Home() {
	const [hotels, setHotels] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage] = useState(5);

	useEffect(() => {
		const items = JSON.parse(localStorage.getItem('hotels'));
		if (items) {
			setHotels(items.sort(function (a, b) {
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			}));
		}
	}, [])


	// Delete Hotel
	const deleteSelectedHotel = (id) => {
		const items = JSON.parse(localStorage.getItem('hotels'));
		const index = items.findIndex(item => {
			return item.id === id;
		});
		const item = items.find(item => {
			return item.id === id;
		});

		Swal.fire({
			title: 'Oteli Sil?',
			text: `${item.name} verisini silmek istediğine emin misin?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'OTELİ SİL!',
			cancelButtonText: 'VAZGEÇ'
		}).then((result) => {
			if (result.isConfirmed) {
				items.splice(index, 1);
				localStorage.setItem('hotels', JSON.stringify(items));
				setHotels(items.sort(function (a, b) {
					return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				}));

				if (currentData.length <= 1) {
					setCurrentPage(Math.floor(hotels.length / perPage));
				}
				Swal.fire({
					title: 'SİLİNDİ!',
					text: 'Otel Başarıyla Silindi.',
					icon: 'success',
					confirmButtonText: 'TAMAM'
				})
			}
		})
	}

	// Sort By point (asc, desc)
	const handlePointChange = (e) => {
		const items = JSON.parse(localStorage.getItem('hotels'));
		let value = e.target.value;
		if (value === 'asc') {
			setHotels(items.sort(function (a, b) {
				return a.point - b.point
			}));
		}
		else if(value === 'desc') {
			setHotels(items.sort(function (a, b) {
				return b.point - a.point
			}));
		}
		else {
			setHotels(items);
		}
		setCurrentPage(1)
	}

	// increase hotel point
	const increasePoint = (id) => {
		const items = JSON.parse(localStorage.getItem('hotels'));
		const hotel = items.find(item => {
			return item.id === id
		})
		if (hotel.point < 10) {
			hotel.point++;
		}
		else {
			hotel.point = 10
		}

		setHotels(items.sort(function (a, b) {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		}));
		localStorage.setItem('hotels', JSON.stringify(items));
	}

	// decrease hotel point
	const decreasePoint = (id) => {
		const items = JSON.parse(localStorage.getItem('hotels'));
		const hotel = items.find(item => {
			return item.id === id
		})
		if (hotel.point > 0) {
			hotel.point--;
		}
		else {
			hotel.point = 0
		}
		setHotels(items.sort(function (a, b) {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		}));
		localStorage.setItem('hotels', JSON.stringify(items));
	}

	// Pagination
	const indexOfLastData = currentPage * perPage;
	const indexOfFirstData = indexOfLastData - perPage
	const currentData = hotels.slice(indexOfFirstData, indexOfLastData)

	const paginate = (pageNumber) => setCurrentPage(pageNumber)

	return (
		<>
			<Layout>
				<div className="hotel-list">
					<div className="container">
						<div className="title">
							<h3>OTELLER LİSTESİ</h3>
						</div>
						<div className="hotel-list-header">
							<div className="add-new">
								<Link href={'/hotels/add'}><a><span className="btn btn-outline-primary mr-3"><Plus/></span>OTEL EKLE</a></Link>
							</div>
							<div className="filter">
								<div className="form-group">
									<select name="point" className="form-control" onChange={handlePointChange}>
										<option value="0">Sıralama</option>
										<option value="asc">Puana göre artan</option>
										<option value="desc">Puana göre azalan</option>
									</select>
								</div>
							</div>
						</div>
						<div className="hotel-list">
							{
								hotels.length === 0
								?
								<div className="not-found text-warning d-flex align-items-center"><Info className="mr-3"/>Veri Bulunamadı.</div>
								:
								currentData.map((item, index) => (
									<div className="item"  key={index}>
										<HotelItem item={item} deleteSelectedHotel={deleteSelectedHotel} increasePoint={increasePoint} decreasePoint={decreasePoint}/>
									</div>
								))
							}
						</div>
						<Pagination currentPage={currentPage} perPage={perPage} totalPage={hotels.length} paginate={paginate}/>
					</div>
				</div>
			</Layout>
		</>
	)
}
