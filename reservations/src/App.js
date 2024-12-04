import './App.css';
import React, { useState } from "react";
import ReservationCreator from './ReservationCreator';

// Constants for the reservation system
const ConservationAreas = [
	"Area 1",
	"Area 2",
	"Area 3",
	"Area 4"
];

const TimeSlots = [
	"9:00 AM - 12:00 PM",
	"12:00 PM - 3:00 PM",
	"3:00 PM - 6:00 PM"
];

function App() {
	const [reservations, setReservations] = useState([
		{ 
			id: 1,
			area: "Area 1",
			timeSlot: "9:00 AM - 12:00 PM",
			date: "2024-01-20",
			userName: "Guest",
			status: "confirmed"
		}
	]);

	const [showPastReservations, setShowPastReservations] = useState(false);

	const createNewReservation = (reservationData) => {
		if (!reservations.find(item => 
			item.area === reservationData.area && 
			item.timeSlot === reservationData.timeSlot && 
			item.date === reservationData.date
		)) {
			setReservations([
				...reservations,
				{ 
					id: Date.now(),
					...reservationData,
					status: "confirmed" 
				}
			]);
		} else {
			alert("This time slot is already booked for the selected date and area.");
		}
	};

	const reservationTableRows = (isPast) => {
		const currentDate = new Date();
		return reservations
			.filter(reservation => {
				const reservationDate = new Date(reservation.date);
				return isPast ? reservationDate < currentDate : reservationDate >= currentDate;
			})
			.map(reservation => (
				<tr key={reservation.id}>
					<td>{reservation.area}</td>
					<td>{reservation.timeSlot}</td>
					<td>{reservation.date}</td>
					<td>{reservation.userName}</td>
					<td>
						<span className={reservation.status === "confirmed" ? "status-confirmed" : "status-unconfirmed"}>
							{reservation.status}
						</span>
					</td>
				</tr>
			));
	};

	return (
		<div className="container-fluid bg-light min-vh-100 py-5">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12 col-lg-10">
						{/* Header */}
						<div className="text-center mb-5">
							<h2 className="display-4 text-dark mb-4">Conservation Reservations</h2>
							<p className="text-muted">Book your visit to our conservation areas</p>
						</div>

						{/* Make Reservation Card */}
						<div className="card border-0 shadow-sm rounded-4 mb-5">
							<div className="card-body p-4 p-md-5">
								<h4 className="card-title mb-4">Make a Reservation</h4>
								<ReservationCreator 
									callback={createNewReservation}
									conservationAreas={ConservationAreas}
									timeSlots={TimeSlots}
								/>
							</div>
						</div>

						{/* Upcoming Reservations */}
						<div className="card border-0 shadow-sm rounded-4 mb-4">
							<div className="card-body p-4">
								<h4 className="card-title mb-4">Upcoming Reservations</h4>
								<div className="table-responsive">
									<table className="table table-borderless align-middle">
										<thead className="text-muted small">
											<tr>
												<th>Area</th>
												<th>Time</th>
												<th>Date</th>
												<th>Reserved By</th>
												<th>Status</th>
											</tr>
										</thead>
										<tbody>
											{reservationTableRows(false)}
										</tbody>
									</table>
								</div>
							</div>
						</div>

						{/* Past Reservations Toggle */}
						<div className="d-flex justify-content-end mb-4">
							<div className="form-check form-switch">
								<input
									className="form-check-input"
									type="checkbox"
									role="switch"
									checked={showPastReservations}
									onChange={(e) => setShowPastReservations(e.target.checked)}
									id="pastReservationsSwitch"
								/>
								<label className="form-check-label text-muted" htmlFor="pastReservationsSwitch">
									Show Past Reservations
								</label>
							</div>
						</div>

						{/* Past Reservations */}
						{showPastReservations && (
							<div className="card border-0 shadow-sm rounded-4">
								<div className="card-body p-4">
									<h4 className="card-title mb-4">Past Reservations</h4>
									<div className="table-responsive">
										<table className="table table-borderless align-middle">
											<thead className="text-muted small">
												<tr>
													<th>Area</th>
													<th>Time</th>
													<th>Date</th>
													<th>Reserved By</th>
													<th>Status</th>
												</tr>
											</thead>
											<tbody>
												{reservationTableRows(true)}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
