// ** Core JWT Import
import useJwt from '@src/@core/auth/jwt/useJwt'
import apiConfig from '@configs/api'

const { jwt } = useJwt({
    loginEndpoint: `${apiConfig.apiEndpoint}/admin/login`
})

export default jwt
