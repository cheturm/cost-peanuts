import './login.scss'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigation = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleSubmission = (e) => {
        e.preventDefault();
        console.log(formData);
        navigation('/dashboard');
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <>
            <h1 className='login-header'>Login</h1>
            <form className='login-form' onSubmit={handleSubmission}>
                <label className='login-form-label' htmlFor="username">Username:</label>
                <input
                    className='login-form-input'
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <label className='login-form-label' htmlFor="password">Password:</label>
                <input
                    className='login-form-input'
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button className='login-submit-button'type="submit">Login</button>

            </form>

        <p className='register-link'>Don't have an account? <Link to='./register'>Register</Link>  </p>
        </>
    );

}

export default Login;