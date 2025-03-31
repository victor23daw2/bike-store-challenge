import axios from 'axios';
import { Option } from '../types/Option';

export const getAllOptions = (): Promise<Option[]> => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/v1/options`).then(res => res.data);
};
