import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://backend-blockchain.com:8001/api/v1',
	responseType: 'json'
})

axiosInstance.interceptors.request.use(
	(config) => {
		return config
	},
	(error) => {
		console.log(error)
	}
)

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error)
	}
)

export default axiosInstance