import * as yup from 'yup';

const phoneRegex = /^\+?[0-9]{7,15}$/


export const personalInfoSchema = yup.object({
    firstName: yup.string().required("First name is required."),
    lastName: yup.string().required("Last name is required."),
    dateOfBirth: yup.date()
        .transform((value, originalValue) => {
            return originalValue === '' ? undefined : value;
        })
        .required("Date of birth is required.")
        .max(new Date(), 'Date of birth cannot be in the future.'),
    nationality: yup.string().required("Nationality is required."),
    email: yup.string()
        .email("Enter a valid email.")
        .required("Email is required."),
    phone: yup.string()
        .matches(phoneRegex, "Enter a valid phone number.")
        .required("Phone number is required."),
});

export const travelPreferencesSchema = yup.object({
    departureDate: yup.date()
        .transform((value, originalValue) => {
            return originalValue === '' ? undefined : value;
        })
        .required("Departure date is required.")
        .min(new Date(new Date().setHours(0,0,0,0)), 'Departure date cannot be in the past.'),
    returnDate: yup.date()
        .transform((value, originalValue) => {
            return originalValue === '' ? undefined : value;
        })
        .required("Return date is required.")
        .min(yup.ref('departureDate'), 'Return date must be after departure date..'),
    accommodation: yup.string()
        .oneOf(['Space Hotel', 'Martian Base'], 'Please select a valid accommodation.')
        .required("Accommodation preference is required."),
    specialRequests: yup.string().nullable(),
});

export const healthSafetySchema = yup.object({
    healthDeclaration: yup.boolean()
        .oneOf([true], 'You must accept the health declaration')
        .required('Health declaration is required'),
    medicalConditions: yup.string().nullable(),
    emergencyContactName: yup.string().required('Emergency contact name is required'),
    emergencyContactPhone: yup.string()
        .matches(phoneRegex, 'Enter a valid phone number')
        .required('Emergency contact phone is required'),
    emergencyContactEmail: yup.string().email('Enter a valid email')
        .required('Emergency contact email is required'),

});

export const getValidationSchema = (step) => {
    switch (step) {
        case 1:
            return personalInfoSchema;
        case 2:
            return travelPreferencesSchema;
        case 3:
            return healthSafetySchema;
        default:
            return yup.object({});
    }
};
