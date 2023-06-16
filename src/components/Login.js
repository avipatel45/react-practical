import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import api from "../api"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState()
    const [hideOTP, setHideOTP] = useState(false)
    const [otp, setOTP] = useState()

    const navigate = useNavigate()

    const sendOTP = async () => {
        if (!email) {
            return toast.error('Please Enter Email')
        }

        setHideOTP(true)
        const data = {
            email: email
        }
        const res = await api.post('login', data)
        if (res.status === 200) {
            toast.success(res.data.message)

        }
    }


    const loginHandler = async () => {
        const data = {
            otp: otp
        }
        const res = await api.post('verifyOTP', data)
        if (res.status === 200) {
            const userData = {
                email: email
            }
            localStorage.setItem('users', JSON.stringify(userData))
            navigate('/home')
            toast.success(res.data.message)
        }
    }

    return (
        <div class="back">
            <ToastContainer position="top-right" autoClose={2000} />
            <div class="div-center">

                <div class="content">
                    <h3>Login</h3>
                    <form>
                        <div className="form-outline mb-4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control className="form-control" disabled={hideOTP} type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                        </div>
                        <div className="getcode-button" >
                            <div> <Button className="btn btn-primary" onClick={() => sendOTP()} disabled={hideOTP}>Get Code</Button></div>
                        </div>
                        <div className="form-outline mb-4">
                            <Form.Label>OTP</Form.Label>
                            <Form.Control className="form-control" type="number" disabled={!hideOTP} placeholder="Enter OTP" value={otp} onChange={(e) => setOTP(e.target.value)} />
                        </div>
                        <div className="form-outline mb-4">
                            <Button className="btn btn-primary " disabled={!hideOTP} onClick={() => loginHandler()}>Login</Button>
                            <Link to='/registration' className="registration-button"><Button>Registration</Button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login