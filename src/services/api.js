import axios from 'axios';
import { LOGIN, SIGNUP } from './apiConstants';

export const login=async(data)=>{
    return axios.post(LOGIN,data)
}
export const signup=async(data)=>{
    return axios.post(SIGNUP,data)
}