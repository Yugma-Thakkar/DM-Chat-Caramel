import React from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'

export default function logout() {

    async function userLogout(event) {
        event.preventDefault()
        const response = await axiosJWT({
            method: 'POST',
            url: 'http://localhost:4000/user/logout',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            data: {
                token: localStorage.getItem('refreshToken')
            }
        })
        console.log(response)
        if (response.data.status === 'OK') {
            localStorage.removeItem('accessToken')
            navigate('/login')
        }
    }

    return (
        <div className="">
            <Button className='rounded-2' variant="secondary" type="submit" onClick={userLogout}>
                Logout
            </Button>
        </div>   
    )
}