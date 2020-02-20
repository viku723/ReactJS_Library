import axios from 'axios';

const axiosInstance = axios.create({
    baseUrl: 'https://book-library-react.firebaseio.com/'
});

export default axiosInstance;