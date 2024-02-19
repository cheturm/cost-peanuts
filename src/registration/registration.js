import './registration.scss';
import { useState, useRef } from 'react';

function Registration() {

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        mobile: '',
        formatedMobile: '',
        interests: '',
        currentInterest: '',
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const inputRefs = useRef({});


    // Simple email validation
    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    };
    // Simple mobile number validation
    const validateMobile = (mobile) => {
        const re = /^\d{10}$/;
        return re.test(mobile);
    }
    // Simple name validation
    const validateName = (name) => {
        const re = /^[a-zA-Z]+$/;
        return re.test(name);
    }

    // Handle form submission
    const handleSubmission = (e) => {
        e.preventDefault();
        let regErrors = {};

        // Validate first name
        if (!formData.fname.trim() || !validateName(formData.fname)) {
            regErrors.fname = 'Please enter first name';
        }

        // Validate last name
        if (!formData.lname.trim() || !validateName(formData.lname)) {
            regErrors.lname = 'Please enter last name';
        }

        // Validate mobile number (basic validation for example purposes)
        if (!validateMobile(formData.mobile)) {
            regErrors.mobile = 'Pease enter a valid 10 digit mobile number';
        }

        // Validate email
        if (!validateEmail(formData.email)) {
            regErrors.email = 'Please enter a valid email address';
        }
        setErrors(regErrors);

        // Checking if regErrors is empty
        if (Object.keys(regErrors).length === 0) {
            console.log('Form is valid. Submitting...', formData);
            // Here you would handle the form submission (e.g., API call)
            // assuming success, showing success message
            setSuccess(true);
        } else {
            // bringing focus to the first error input field
            // can be refined using refs
            //document.getElementById(Object.keys(regErrors)[0]).focus();
            inputRefs.current[Object.keys(regErrors)[0]].focus();
        }
    };

    const handleChange = (e) => {
        // console.log(e.target.name);
        if (e.target.name === 'mobile') {
            handleMobileChange(e);
        }
        else {
            const { name, value } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));

            // removing errors for the field on change
            if (errors[name]) {
                setErrors((prev) => ({
                    ...prev,
                    [name]: '',
                }));
            }
        }

    }
    const handleInterests = () => {
        let intresting = '';
        if (formData.interests === '') {
            intresting = "#" + formData.currentInterest;
        } else {
            intresting = formData.interests + ", #" + formData.currentInterest;
        }

        setFormData((prev) => ({
            ...prev,
            ['interests']: intresting,
            ['currentInterest']: '',
        }));

    }
    const handleMobileChange = (e) => {
        let formattedNumber = '';
        const { name, value } = e.target;
        const numbers = value.replace(/\D/g, '');
        if (numbers.length < 4) {
            formattedNumber = numbers;
        } else if (numbers.length < 7) {
            formattedNumber = `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
        } else {
            formattedNumber = `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
        }
        // console.log(numbers, formattedNumber);
        setFormData((prev) => ({
            ...prev,
            [name]: numbers,
            formatedMobile: formattedNumber,
        }));

        // removing errors for the field on change
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    }

    if (!success) {
        return (
            <>
                <h1 className='reg-header'>Register for Cyber Fitness Test</h1>
                <form className='reg-form-container' onSubmit={handleSubmission}>

                    <label className='reg-form-label' htmlFor='fname'> First Name: </label>
                    <input
                        placeholder='eg: John'
                        onChange={handleChange}
                        className={errors.fname ? "reg-form-input-error" : "reg-form-input"}
                        type="text"
                        name="fname"
                        id='fname'
                        maxLength={20}
                        ref={el => inputRefs.current['fname'] = el}
                    />
                    {errors.fname && <p aria-live="polite" className='error-message'>{errors.fname}</p>}

                    <label className='reg-form-label' htmlFor='lname'> Last Name: </label>
                    <input
                        placeholder='eg: Smith'
                        onChange={handleChange}
                        className={errors.lname ? "reg-form-input-error" : "reg-form-input"}
                        type="text"
                        name="lname"
                        id='lname'
                        maxLength={20}
                        ref={el => inputRefs.current['lname'] = el}
                    />
                    {errors.lname && <p aria-live="polite" className='error-message'>{errors.lname}</p>}

                    <label className='reg-form-label' htmlFor='mobile'> Mobile Number: </label>
                    <input
                        placeholder='eg: (123) 456-7890'
                        onChange={handleChange}
                        className={errors.mobile ? "reg-form-input-error" : "reg-form-input"}
                        type="tel"
                        name="mobile"
                        id='mobile'
                        maxLength={14}
                        ref={el => inputRefs.current['mobile'] = el}
                        value={formData.formatedMobile}
                    />
                    {errors.mobile && <p aria-live="polite" className='error-message'>{errors.mobile}</p>}

                    <label className='reg-form-label' htmlFor='email'> Email Address: </label>
                    <input
                        placeholder='eg: john@cf.com'
                        onChange={handleChange}
                        className={errors.email ? "reg-form-input-error" : "reg-form-input"}
                        type="text"
                        name="email"
                        id='email'
                        maxLength={50}
                        ref={el => inputRefs.current['email'] = el}
                    />
                    {errors.email && <p aria-live="polite" className='error-message'>{errors.email}</p>}

                    <label className='reg-form-label' htmlFor='currentInterest'> Interest: </label>
                    <input
                        placeholder='eg: music'
                        onChange={handleChange}
                        className={errors.interests ? "reg-form-input-error" : "reg-form-input-interests"}
                        type="text"
                        name="currentInterest"
                        id='currentInterest'
                        value={formData.currentInterest}
                        maxLength={50}
                        ref={el => inputRefs.current['email'] = el}
                    />
                    <button className='reg-add-button' type='button' onClick={handleInterests}>Add</button>
                    {formData.interests && <p aria-live="polite">{formData.interests}</p>}
                    {errors.interests && <p aria-live="polite" className='error-message'>{errors.interests}</p>}
                    <button className="reg-submit-button" type="submit">Submit</button>
                </form>
            </>
        );
    } else {
        return (
            <div className='reg-success-box'>
                <h1>Thank you for registering!</h1>
                <p>You will receive a confirmation email and link to schedule test</p>
            </div>
        );
    }
}

export default Registration;