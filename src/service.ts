import axiosInstance from '../API';

export const getMembers = () => {
	return axiosInstance.get('/members')
}

export const getNetworkSchema = () => {
	return axiosInstance.get('/network')
}