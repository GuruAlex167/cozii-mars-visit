import React from "react";

export default function PersonalInfoForm({ formData, handleChange, formErrors} ) {

    return (
        <div className="form-step">
            <h2>Stage 1: Personal Information</h2>

            <div className="form-group">
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={formErrors.firstName ? 'error' : ''}
                />
                {formErrors.firstName && <span className="error-text">{formErrors.firstName}</span>}
            </div>

            <div className="form-group">
                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={formErrors.lastName ? 'error' : ''}
                />
                {formErrors.lastName && <span className="error-text">{formErrors.lastName}</span>}
            </div>

            <div className="form-group">
                <label>Date of Birth</label>
                <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={formErrors.dateOfBirth ? 'error' : ''}
                />
                {formErrors.dateOfBirth && <span className="error-text">{formErrors.dateOfBirth}</span>}
            </div>

            <div className="form-group">
                <label>Nationality</label>
                <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    className={formErrors.nationality ? 'error' : ''}
                />
                {formErrors.nationality && <span className="error-text">{formErrors.nationality}</span>}
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={formErrors.email ? 'error' : ''}
                />
                {formErrors.email && <span className="error-text">{formErrors.email}</span>}
            </div>

            <div className="form-group">
                <label>Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={formErrors.phone ? 'error' : ''}
                />
                {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
            </div>
        </div>
    );
}