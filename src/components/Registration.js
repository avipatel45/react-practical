import { useState } from "react"
import { Button, Card, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import api from "../api"
import './Registration.css'

const Registration = () => {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [contactNumber, setContactNumber] = useState()
    const navigate = useNavigate()

    const handleRegistration = async () => {
        try {
            const data = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                contactNumber: contactNumber
            }

            const res = await api.post(`registration`, data)
            if (!res.data.error) {
                toast.success(res.data.message)
                navigate('/')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {

        }

    }

    return (
        <div className="container mt-2">
            <ToastContainer position="top-right" autoClose={2000} />
            <Card>
                <Card.Header>
                    <Card.Title>User Registration</Card.Title>
                </Card.Header>
                <Card.Body>
                    <div>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                    </div>
                    <div className="register-button pt-2">
                        <Button onClick={() => handleRegistration()}>Save</Button>
                    </div>
                </Card.Body>
            </Card>



        </div>
    )
}

export default Registration