import axios from 'axios';

const baseServiceUrl = process.env.NEXT_PUBLIC_BASE_SERVICE_URL;
const axiosInstance = axios.create({
	baseURL: baseServiceUrl + '/api/v1',
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