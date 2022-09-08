import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {

    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     if (token) {
    //         navigate('/')
    //     }
    // })
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function reRouteRegister(event) {
        event.preventDefault()
        navigate('/register')
    }

    async function userLogin(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:4000/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            }
        )
        const data = await response.json()
        console.log(data)
        
        
        if(data.status === 'OK') {
            //store token to localstorage
            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)
            //redirect to home page
            navigate('/')
        }
        else {
            // display error message
            alert('Login failed')
        }
    }
    
    return (
        <div> 
            <h1>Login</h1>
            <form onSubmit={userLogin}>
                <input 
                    value={username}
                    type="text" 
                    id="username" 
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                    autoComplete="off"
                /> <br /> <br />
                <input
                    value={password}
                    type="password"
                    id="password"
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="off"
                /> <br /> <br />
                <input type="submit" value="Login" />
                <br /><br /><br /><br />
            </form>
            <button onClick={reRouteRegister}>Register</button>
        </div>
    )
}