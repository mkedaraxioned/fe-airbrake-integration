import axios from 'axios';
import { variables } from '../constants/backend';

export const _post = (url: string, payload: any) => {
  return axios.post(`${variables.BACKEND_URL}${url}`, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const _get = (url: string) => {
  return axios.get(`${variables.BACKEND_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const _patch = (url: string, payload: any) => {
  return axios.patch(`${variables.BACKEND_URL}${url}`, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const _put = (url: string, payload: any) => {
  return axios.put(`${variables.BACKEND_URL}${url}`, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const _del = (url: string) => {
  return axios.delete(`${variables.BACKEND_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
