import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { setUserPrefs } from '../store/user.actions.js'
const { useSelector } = ReactRedux 
const { useNavigate } = ReactRouterDOM

export function UserDetails() {
  const { useSelector } = ReactRedux 
  const { useNavigate } = ReactRouterDOM
  const { useState } = React

  const loggedInUser = useSelector((storeState) => storeState.loggedInUser)
  const navigate = useNavigate()   

  const [prefs, setPrefs] = useState(loggedInUser.userPrefs || {})

  function handleChange({ target }) {
    const field = target.name
    const value = target.value
    setPrefs(prevPrefs => ({ ...prevPrefs, [field]: value }))
  }

  function savePrefs(ev) {
    ev.preventDefault()
    setUserPrefs(prefs)  
    showSuccessMsg('Preferences saved successfully!')
    navigate('/todo') 
  }

  return (
    <section className='user-details'>
      <form className="user-details card" onSubmit={savePrefs}>
        <h1 className="main-header"> User Details</h1>
        <h2 className="settings-header"> Set Preferences</h2>

        <div className="form-group">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="Enter your user name"
            value={prefs.userName || ''}   
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="txt-colour">Text Colour</label>
          <input
            type="color"
            id="txt-colour"
            name="txt-colour"
            value={prefs['txt-colour'] || '#ffffff'}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bgc-colour">Background Colour</label>
          <input
            type="color"
            id="bgc-colour"
            name="bgc-colour"
            value={prefs['bgc-colour'] || '#000000'}
            onChange={handleChange}
          />
        </div>

        <button className="save-btn"> Save Settings</button>
      </form>
      <h3 className='activities'>Your Recent Activities</h3>
      <ul>
          {loggedInUser.activities.map((act, idx) => (
            <li key={idx} >
              {act.txt} created at: {new Date(act.at).toLocaleString()}
            </li>
          ))}
      </ul>
    </section>
  )
}
