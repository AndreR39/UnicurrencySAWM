import React, {useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Validation from './SignupValidation';
import axios from 'axios'

function Signup(){

    const[values, setValues] = useState({
        name:'',
        email:'',
        password:''
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]:[event.target.value]}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const err = Validation(values);
        setErrors(err);
    };
    
    useEffect(() => {
        if (errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/signup', values)
                .then(res => {
                    navigate('/');
                })
                .catch(err => console.log(err));
        }
    }, [errors]);
    
    

    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign Up</h2>
                <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                        <label htmlFor='name'><strong>Name</strong></label>
                        <input type="name" placeholder='Enter your Name' name='name' onChange={handleInput} className='form-control rounded-0'></input>
                        <span>{errors.name && <span className='text-danger'> {errors.name}</span>}</span>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' onChange={handleInput} className='form-control rounded-0'></input>
                        <span>{errors.email && <span className='text-danger'> {errors.email}</span>}</span>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password' onChange={handleInput} className='form-control rounded-0'></input>
                        <span>{errors.password && <span className='text-danger'> {errors.password}</span>}</span>
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
                    <p>* By creating an account you agree to our terms and policies</p>
                    <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>I already have an account</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup