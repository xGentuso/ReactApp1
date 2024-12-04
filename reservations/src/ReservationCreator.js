import React, { useState } from "react";

function ReservationCreator({ callback, conservationAreas, timeSlots }) {
    const [formData, setFormData] = useState({
        area: conservationAreas[0],
        timeSlot: timeSlots[0],
        date: new Date().toISOString().split('T')[0],
        userName: ""
    });

    const updateFormField = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.userName && formData.date) {
            callback(formData);
            setFormData({
                ...formData,
                userName: ""
            });
        }
    };

    return (
        <div className="card m-3 p-3">
            <h5 className="card-title">Make a Reservation</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Conservation Area</label>
                    <select 
                        className="form-select"
                        value={formData.area}
                        onChange={(e) => updateFormField("area", e.target.value)}
                    >
                        {conservationAreas.map(area => (
                            <option key={area} value={area}>{area}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Time Slot</label>
                    <select 
                        className="form-select"
                        value={formData.timeSlot}
                        onChange={(e) => updateFormField("timeSlot", e.target.value)}
                    >
                        {timeSlots.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input 
                        type="date"
                        className="form-control"
                        value={formData.date}
                        onChange={(e) => updateFormField("date", e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Your Name</label>
                    <input 
                        type="text"
                        className="form-control"
                        value={formData.userName}
                        onChange={(e) => updateFormField("userName", e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Make Reservation
                </button>
            </form>
        </div>
    );
}

export default ReservationCreator; 