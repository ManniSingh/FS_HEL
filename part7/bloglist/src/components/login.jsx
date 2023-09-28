import PropTypes from 'prop-types'
import React from 'react'
import Tail from '../tail'

function LoginForm({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) {
  return (
    <Tail.div>
      <Tail.h2>Login</Tail.h2>
      <Tail.form onSubmit={handleSubmit}>
        <Tail.div>
          Username
          <Tail.input
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
          Password
          <Tail.input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Tail.button id="login-button" type="submit">login</Tail.button>
        </Tail.div>
      </Tail.form>
    </Tail.div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
