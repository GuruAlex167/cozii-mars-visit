import React from "react";


export default function TravelPreferences({ formData, handleChange, formErrors }) {
    return (
        <div className="form-step">
            <h2>Stage 2: Travel Preferences</h2>

            <div className="form-group">
                <label>Departure Date</label>
                <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                    className={formErrors.departureDate ? 'error' : ''}
                />
                {formErrors.departureDate && <span className="error-text">{formErrors.departureDate}</span>}
            </div>

            <div className="form-group">
                <label>Return Date</label>
                <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                    className={formErrors.returnDate ? 'error' : ''}
                />
                {formErrors.returnDate && <span className="error-text">{formErrors.returnDate}</span>}
            </div>

            <div className="form-group">
                <label>Accommodation Preference</label>
                <select
                    name="accommodation"
                    value={formData.accommodation}
                    onChange={handleChange}
                    className={formErrors.accommodation ? 'error' : ''}
                >
                    <option value="">Select accommodation</option>
                    <option value="Space Hotel">Space Hotel</option>
                    <option value="Martian Base">Martian Base</option>
                </select>
                {formErrors.accommodation && <span className="error-text">{formErrors.accommodation}</span>}
            </div>

            <div className="form-group">
                <label>Special Requests</label>
                <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                ></textarea>
            </div>


        </div>

    );
}