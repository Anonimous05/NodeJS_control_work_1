import axios from 'axios'
import {axiosURL} from './axiosURL';

export const axiosAPI = axios.create({
   baseURL: axiosURL,
});