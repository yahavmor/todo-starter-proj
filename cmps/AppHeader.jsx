const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector } = ReactRedux 

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/user.actions.js'



export function AppHeader() {
    const todos = useSelector((state) => state.todos)
    const navigate = useNavigate()
    const loggedInUser = useSelector((storeState) => storeState.loggedInUser)
    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('Logged out successfully')
                navigate('/')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {loggedInUser ? (
                    < section >
                        <Link className="user-link" to={`/user/${loggedInUser._id}`}>Hello {loggedInUser.fullname}</Link>
                        <span className="balance">Balance: {loggedInUser.balance}</span>
                        <div>100%</div>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup />
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}