import { userService } from "../services/user.service.js"
import { SET_USER, store } from "./store.js"



export function login(credentials){
      return userService.login(credentials)
      .then(loggedInUser => {
            store.dispatch({ type: SET_USER, loggedInUser})
            return loggedInUser
      })    
      .catch(err => {
            console.error('err:', err)
            throw err
      })
}
export function signup(credentials){
      return userService.signup(credentials)
      .then(loggedInUser => {
            store.dispatch({ type: SET_USER, loggedInUser})
            return loggedInUser
      })    
      .catch(err => {
            console.error('err:', err)
            throw err
      })
}
export function logout(){
      return userService.logout()
      .then(() => {
            store.dispatch({ type: SET_USER, loggedInUser: null})
      })
      .catch(err => {
            console.error('err:', err)
            throw err
      })
}
export function toggleSignUp() {    
      store.dispatch({ type: 'TOGGLE_SIGNUP' })
}     
