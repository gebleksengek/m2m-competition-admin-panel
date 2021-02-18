// ** Handle User Login
export const handleLogin = data => {
  return dispatch => {
    dispatch({ type: 'LOGIN', data })

    // ** Add to user to localStorage
    localStorage.setItem('userData', JSON.stringify(data))
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT' })

    // ** Remove user from localStorage
    localStorage.removeItem('userData')
  }
}
