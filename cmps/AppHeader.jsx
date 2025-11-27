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
    const doneTodos = todos.filter(todo => todo.isDone).length
    const progressPercentage = Math.round((doneTodos / todos.length) * 100)
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
        
    <header
        className="app-header full main-layout"
        style={{    
        color: (loggedInUser && loggedInUser.userPrefs && loggedInUser.userPrefs['txt-colour']) || '#fff',
        backgroundColor: (loggedInUser && loggedInUser.userPrefs && loggedInUser.userPrefs['bgc-colour']) || '#000'
        }}
        >
        <section className="header-container">
            {loggedInUser ? (
                <section>
                    <Link className="user-link" to={`/user/${loggedInUser._id}`}>Hello {loggedInUser.fullname}</Link>
                    <span className="balance">Balance: {loggedInUser.balance}</span>
                    <div className="progress-percentage">You have completed {progressPercentage}% of your todos</div>
                    <button onClick={onLogout}>Logout</button>
                </section>
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
            <nav className="app-nav">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/about" >About</NavLink>

                {loggedInUser && (<section className="user-links"><NavLink to="/todo" >Todos</NavLink>
                <NavLink to="/dashboard" >Dashboard</NavLink></section>)}
            </nav>
        </section>
        <UserMsg />
    </header>
    )
}
