import axios from 'axios'

const baseUrl = '/api/users'

const register = async newUser => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

export default { register }