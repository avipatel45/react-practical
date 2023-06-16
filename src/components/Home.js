import { useEffect, useState } from "react"
import { Button, Card, Col, Row, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import api from "../api"
import './Home.css'


const Home = () => {
    const [users, setUsers] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        async function viewUser() {
            const res = await api.get('viewUsers')
            setUsers(res.data.message)
        }
        viewUser()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('users')
        navigate('/')
    }

    return (
        !localStorage.getItem('users') ? "Login required" :
            <div className="body-color">

                <div className="container">
                    <div className="logout-button" onClick={() => handleLogout()}><p>Logout</p></div>
                    <div className="card-button">
                        <div className="w-100">
                            <Row className="pt-2">
                                <Col className="col-md-4">
                                    <Card className="">
                                        <Card.Header>
                                            <Card.Title>Total Users</Card.Title>
                                        </Card.Header>
                                        <Card.Body className="text-center">{users && users.length}</Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                        <div><Link to="/registration" className="text-color"><Button className="">Add New User</Button></Link></div>
                    </div>
                    <div className="pt-2">
                        <Row>
                            <Col className="col-md-12">
                                <Table className="table-responsive table-striped text-center table-bordered">
                                    <thead>
                                        <tr>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>Contact Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users && users.map((user) => (
                                            <tr>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.email}</td>
                                                <td>{user.contactNumber}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>

                    </div>
                </div>
            </div >
    )
}

export default Home