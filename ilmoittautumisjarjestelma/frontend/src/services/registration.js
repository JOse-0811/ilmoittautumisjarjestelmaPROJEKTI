import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/registrations'


const register = async (eventObject) => {
    const response = await axios.post(
        baseUrl,
        eventObject
    );
    return response.data;
};

export default { register }