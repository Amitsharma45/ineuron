import React, { useState } from 'react'
import './CreateUser.css'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link ,useParams } from "react-router-dom";
const userSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required')
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required')
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    age: Yup.string().min(1, 'Invalid age').required('Required'),
    phoneNumber: Yup.string().min(10, 'Invalid Number').max(10, 'Number should be less then 10 digit').required('Required')

});

export default function UpdateUser() {
    const id= useParams().id;
    let navigate = useNavigate();
    const [user,setuser]=useState('');
    async function getDataByid() {
        const { data } = await axios.get(
            `https://blue-journalist-bbrpv.ineuron.app:4000/user/${id}`
        );
        setuser(data.data);
        console.log(data.data)
    }
    React.useEffect(() => {
        getDataByid();
    }, []);
    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Update User Date</h1>
            <div className='form'>
                <Formik
                    initialValues={{
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phoneNumber: user.phoneNumber,
                        age: user.age
                    }}
                    enableReinitialize
                    validationSchema={userSchema}
                    onSubmit={async (values) => {
                            const { data } = await axios.patch(`https://blue-journalist-bbrpv.ineuron.app:4000/user/${id} `, values)
                            console.log(values)
                            console.log(data)
                            alert('User Update Success Fully')
                            navigate('/');
                       
                    }}
                >
                    {({ errors, touched, handleChange, handleBlur ,values}) => (
                        <Form  >
                            <div className='formItem'>
                                <label>First Name</label>
                                <input type='text' placeholder='First Name' id="firstName"
                                    name="firstName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstName}
                                     />

                                {errors.firstName && touched.firstName ? (
                                    <div className='err'>{errors.firstName}</div>
                                ) : null}
                            </div>


                            <div className='formItem'>
                                <label>Last Name</label>
                                <input type='text' placeholder="Last name" id="lastName"
                                    name="lastName"
                                    onChange={handleChange}
                                    onBlur={handleBlur} 
                                    value={values.lastName}
                                    />
                                {errors.lastName && touched.lastName ? (
                                    <div className='err'>{errors.lastName}</div>
                                ) : null}
                            </div>

                            <div className="formItem">
                                <label>Number</label>
                                <input id="phoneNumber"
                                    name="phoneNumber"
                                    type="number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phoneNumber}
                                    className="form-control" placeholder="Enter phone number" />
                                {errors.phoneNumber && touched.phoneNumber ? <div className='err'>{errors.phoneNumber}</div> : null}
                            </div>

                            <div className="formItem">
                                <label>Age</label>
                                <input id="age"
                                    name="age"
                                    type="Number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.age}
                                    className="form-control" placeholder="Enter age" />
                                {errors.age && touched.age ? <div className='err'>{errors.age}</div> : null}
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <button type="submit"
                                >Update User</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
  
}
