import { useSkin } from '@hooks/useSkin'
import { Link, useHistory } from 'react-router-dom'
import { useState, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { toast, Slide } from 'react-toastify'
import PropTypes from 'prop-types'
import InputPasswordToggle from '@components/input-password-toggle'
import Avatar from '@components/avatar'
import { Coffee } from 'react-feather'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button, FormFeedback } from 'reactstrap'
import { handleLogin } from '@store/actions/auth'
import '@styles/base/pages/page-auth.scss'
import useJwt from '@src/auth/jwt/useJwt'

const ToastContent = (props) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color={props.type} icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>{props.title}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>{props.body}</span>
    </div>
  </Fragment>
)
ToastContent.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string
}

const Login = () => {
  const [skin, setSkin] = useSkin()
  const history = useHistory()
  const [username, setUsername] = useState("")
  const [usernameError, setUsernameError] = useState({
    isValid: false,
    isInit: false,
    isInit: true,
    msg: ""
  })
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState({
    isValid: false,
    isInit: false,
    isInit: true,
    msg: ""
  })
  const dispatch = useDispatch()

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const handleLoginSubmit = (e) => {
    e.preventDefault()

    useJwt.login(
      { username, password },
      {
        validateStatus: (status) => {
          return 200 <= status <= 499
        }
      }
    ).then(res => {
      const { status, data, validationError, errorMsg } = res.data
      if (status) {
        dispatch(handleLogin(data))
        history.push("/")
        toast(
          <ToastContent type="success" title="Login Success" body="" />,
          {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000,
            position: toast.POSITION.TOP_RIGHT
          }
        )
      } else {
        if (validationError) {
          const { username, password } = validationError

          if (username) {
            setUsernameError({
              isValid: false,
              isInit: false,
              msg: username[0]
            })
          } else {
            setUsernameError({
              isValid: true,
              isInit: false,
              msg: ""
            })
          }

          if (password) {
            setPasswordError({
              isValid: false,
              isInit: false,
              msg: password[0]
            })
          } else {
            setPasswordError({
              isValid: true,
              isInit: false,
              msg: ""
            })
          }
        } else {
          setUsernameError({
            isValid: true,
            isInit: false,
            msg: ""
          })
          setPasswordError({
            isValid: true,
            isInit: false,
            msg: ""
          })

        }

        if (errorMsg) {
          if (errorMsg.toLowerCase() === "username not exist") {
            setUsernameError({
              isValid: false,
              isInit: false,
              msg: errorMsg
            })
            setPasswordError({
              isValid: false,
              isInit: false,
              msg: ""
            })
          }
          if (errorMsg.toLowerCase() === "invalid password") {
            setPasswordError({
              isValid: false,
              isInit: false,
              msg: errorMsg
            })
          }

          toast(
            <ToastContent type="danger" title="Login Failed" body={errorMsg} />,
            {
              transition: Slide,
              hideProgressBar: true,
              autoClose: 2000,
              position: toast.POSITION.TOP_RIGHT
            }
          )
        }
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/'>
          <h2 className='brand-text text-primary ml-1'>M2M Competition Admin</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Welcome to Admin Panel! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
            <Form onSubmit={handleLoginSubmit} className='auth-login-form mt-2'>
              <FormGroup>
                <Label className='form-label' for='login-username'>
                  Username
                </Label>
                <Input valid={usernameError.isValid} invalid={!usernameError.isValid && !usernameError.isInit} value={username} onChange={e => setUsername(e.target.value)} type='text' id='login-username' placeholder='username' autoFocus />
                <FormFeedback>{usernameError.msg}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='login-password'>
                  Password
                </Label>
                <InputPasswordToggle valid={passwordError.isValid} invalid={!passwordError.isValid && !passwordError.isInit} onChange={e => setPassword(e.target.value)} className='input-group-merge' id='login-password' />
                <p
                  style={{
                    fontWeight: 400,
                    lineHeight: 1.45,
                    textAlign: "left",
                    direction: "ltr",
                    boxSizing: "border-box",
                    width: "100%",
                    fontSize: "0.857rem",
                    marginTop: "0.25rem",
                    display: "block"
                  }} className="text-danger"
                >
                  {passwordError.msg}
                </p>
              </FormGroup>
              <FormGroup>
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' />
              </FormGroup>
              <Button.Ripple color='primary' block>
                Sign in
              </Button.Ripple>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
