import React from "react";

export default function HealthAndSafetyForm({ formData, handleChange, formErrors }) {
    return (
        <div className="form-step">
            <h2>Stage 3: Health and Safety</h2>

            <div className="form-group checkbox-group">
                <input
                    type="checkbox"
                    id="healthDeclaration"
                    name="healthDeclaration"
                    checked={formData.healthDeclaration}
                    onChange={handleChange}
                />
                <label htmlFor="healthDeclaration">
                    I declare that I am in good health and fit to travel to Mars
                </label>
                {formErrors.healthDeclaration && <span className="error-text">{formErrors.healthDeclaration}</span>}
            </div>

            <div className="form-group">
                <label>Emergency Contact Name</label>
                <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    className={formErrors.emergencyContactName ? 'error' : ''}
                />
                {formErrors.emergencyContactName &&
                    <span className="error-text">{formErrors.emergencyContactName}</span>}
            </div>

            <div className="form-group">
                <label>Emergency Contact Phone</label>
                <input
                    type="tel"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleChange}
                    className={formErrors.emergencyContactPhone ? 'error' : ''}
                />
                {formErrors.emergencyContactPhone &&
                    <span className="error-text">{formErrors.emergencyContactPhone}</span>}
            </div>

            <div className="form-group">
                <label>Emergency Contact Email</label>
                <input
                    type="email"
                    name="emergencyContactEmail"
                    value={formData.emergencyContactEmail}
                    onChange={handleChange}
                    className={formErrors.emergencyContactEmail ? 'error' : ''}
                />
                {formErrors.emergencyContactEmail &&
                    <span className="error-text">{formErrors.emergencyContactEmail}</span>}
            </div>

            <div className="form-group">
                <label>Medical Conditions (if any)</label>
                <textarea
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleChange}
                ></textarea>
            </div>
        </div>
    );
}
