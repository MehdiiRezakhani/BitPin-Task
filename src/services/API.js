import axios from 'axios';
const fetchAPI = async (BaseURL) => {
    const response = await axios.get(BaseURL);
    return response.data;
}
export {fetchAPI}