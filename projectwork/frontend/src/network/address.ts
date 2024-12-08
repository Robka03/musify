import API from './axios'; // Import the new axiosInstance

export type Address = {
    id?: number;
    name: string;
    addressLine: string;
    city: string;
    county: string;
    zipCode: string;
};

const API_BASE_URL = '/addresses';

export const fetchAddresses = async () => {
    const response = await API.get(API_BASE_URL);
    return response.data;
};

export const fetchAddressById = async (id: number) => {
    const response = await API.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

export const createAddress = async (address: any) => {
    const response = await API.post(API_BASE_URL, address);
    return response.data;
};

export const updateAddress = async (id: number, address: any) => {
    const response = await API.put(`${API_BASE_URL}/${id}`, address);
    return response.data;
};

export const deleteAddress = async (id: number) => {
    await API.delete(`${API_BASE_URL}/${id}`);
};