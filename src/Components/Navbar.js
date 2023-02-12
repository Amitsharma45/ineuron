import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
export default function Navbar() {
    return (
        <div className='navbar'>
            <Link to={'create-user'} style={{color:'white' , textDecoration:'none'}}>
                <div style={{ padding: '0 10px' }} >Add user</div>
            </Link>
            <Link to={'Users'} style={{color:'white' , textDecoration:'none'}}>
                <div>Manage user</div>
            </Link>
        </div>
    )
}
