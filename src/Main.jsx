import React, {useState} from 'react';
import {healthSafetySchema, personalInfoSchema, travelPreferencesSchema} from "./validationSchema";
import './main.css';
import PersonalInfoForm from "./forms/PersonalInfoForm";
import TravelPreferences from "./forms/TravelPerferencesForm";
import HealthAndSafetyForm from "./forms/HealthAndSafetyForm";
import NotFoundPage from "./NotFoundPage";


function App() {
    const [currentStep, setCurrentStep] = useState(1);
    const [maxStep, setMaxStep] = useState(1);
    const [formData, setFormData] = useState({
        // Personal info
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        nationality: '',
        email: '',
        phone: '',

        // Travel preferences
        departureDate: '',
        returnDate: '',
        accommodation: '',
        specialRequests: '',

        // Health and safety
        healthDeclaration: false,
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactEmail: '',
        medicalConditions: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [applicationId, setApplicationId] = useState("");

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validateForm = async (step) => {
        let schema;
        let dataToValidate = {};

        // Select the appropriate schema based on current step
        if (step === 1) {
            schema = personalInfoSchema;
            dataToValidate = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                dateOfBirth: formData.dateOfBirth,
                nationality: formData.nationality,
                email: formData.email,
                phone: formData.phone
            };
        } else if (step === 2) {
            schema = travelPreferencesSchema;
            dataToValidate = {
                departureDate: formData.departureDate,
                returnDate: formData.returnDate,
                accommodation: formData.accommodation
            };
        } else if (step === 3) {
            schema = healthSafetySchema;
            dataToValidate = {
                healthDeclaration: formData.healthDeclaration,
                emergencyContactName: formData.emergencyContactName,
                emergencyContactPhone: formData.emergencyContactPhone,
                emergencyContactEmail: formData.emergencyContactEmail,
            };
        }

        try {
            await schema.validate(dataToValidate, {abortEarly: false});
            setFormErrors({});
            return true;
        } catch (err) {
            const errors = {};
            if (err.inner) {
                err.inner.forEach(error => {
                    errors[error.path] = error.message;
                });
            }
            setFormErrors(errors);
            return false;
        }
    };

    const handleNext = async () => {
        setIsLoading(true);
        validateForm(currentStep)
            .then(isValid => {
                    if (isValid) {
                        if (currentStep === maxStep) {
                            setMaxStep(maxStep => maxStep + 1);
                        }
                        setCurrentStep(currentStep => currentStep + 1);
                        setTimeout(() => setFormErrors({}), 10);
                    }
                }
            );
        setIsLoading(false);
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
        setTimeout(() => setFormErrors({}), 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) {
            return;
        }

        setIsLoading(true);
        console.log('Success');
        const isValid = await validateForm(currentStep);
        if (isValid) {

            // send data to the server
            try {
                const response = await fetch('/api/applications', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Submission failed');
                }
                console.log('Form submitted:', formData);
                setApplicationId(data.applicationId);
                setIsSubmitted(true);
                setIsLoading(false);
            } catch (error) {
                console.error('Submission error:', error);
                alert('There was an error submitting your application. Please try again.');
            } finally {
                setIsLoading(false);
            }

        } else {
            console.log("something failed.");
            setIsLoading(false);
        }
    };

    const handleStepNavigation = (step) => {
        if (step <= maxStep) {
            setCurrentStep(step);
        }
    }

    const renderForm = () => {
        switch (currentStep) {
            case 1:
                return <>
                    <PersonalInfoForm formData={formData} handleChange={handleChange} formErrors={formErrors}/>
                    <div className="button-group">
                        <div></div>
                        {/* Empty div to maintain flex layout */}
                        <button className="next-button" type="button" onClick={handleNext}>Next</button>
                    </div>
                </>;
            case 2:
                return <>
                    <TravelPreferences formData={formData} handleChange={handleChange} formErrors={formErrors}/>
                    <div className="button-group">
                        <button type="button" onClick={handlePrev}>Previous</button>
                        <button className="next-button" type="button" onClick={handleNext}>Next</button>
                    </div>
                </>;
            case 3:
                return <>
                    <HealthAndSafetyForm formData={formData} handleChange={handleChange} formErrors={formErrors}/>
                    <div className="button-group">
                        <button type="button" onClick={handlePrev}>Previous</button>
                        <button className="next-button" type="submit" disabled={isLoading || isSubmitted}>Submit
                            Application
                        </button>
                    </div>
                </>;

            default:
                return <NotFoundPage/>;
        }
    };

    const renderSuccess = () => {
        return (
            <div className="success-message">
                <h2>Application Submitted Successfully!!!</h2>
                <p>Thank you, {formData.firstName} {formData.lastName}, for your interest in visiting Mars.</p>
                <p>We will contact you at {formData.email} with further information.</p>
                <p>If you have any questions feel free to reach out at AlexDale167@gmail.com</p>
                <p>Please reference ID:{applicationId}</p>
            </div>
        );
    };

    return (
        <div className="app">
            <div className="container">
                <h1>Mars Visit Application</h1>

                {!isSubmitted && (
                    <div className="progress-indicator">
                        <button type="button"
                                className={`step ${currentStep === 1 ? 'active' : ''}
                                    ${currentStep > 1 ? ' completed' : ''}`}
                                onClick={() => {
                                    handleStepNavigation(1)
                                }}
                                aria-label={
                                    currentStep === 1
                                        ? "Current Step: Personal Info"
                                        : currentStep > 1
                                            ? "Completed: Personal Info"
                                            : "Personal Info"
                                }>1. Personal Info
                        </button>
                        <button type="button"
                                className={`step ${currentStep === 2 ? 'active' : ''}
                                ${currentStep > 2 ? ' completed' : ''}`}
                                onClick={() => {
                                    handleStepNavigation(2)
                                }}
                                aria-label={
                                    currentStep === 2
                                        ? "Current Step: Travel Preferences"
                                        : currentStep > 2
                                            ? "Completed: Travel Preferences"
                                            : "Travel Preferences"

                                }>2. Travel Preferences
                        </button>
                        <button type="button"
                                className={`step ${currentStep === 3 ? 'active' : ''}`}
                                onClick={() => {
                                    handleStepNavigation(3)
                                }}
                                aria-label="Health & Safety"
                        >3. Health & Safety
                        </button>
                    </div>
                )}

                {!isSubmitted ? (
                    <form onSubmit={handleSubmit}>
                        {renderForm()}
                    </form>
                ) : (
                    renderSuccess()
                )}
            </div>
        </div>
    );
}

export default App;