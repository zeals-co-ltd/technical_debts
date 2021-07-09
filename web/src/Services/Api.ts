import apisauce from 'apisauce';

import { Issue } from '../Types/Github'

const api = apisauce.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: 'application/json;charset=UTF-8',
    'Content-Type': 'application/json',
  },
});

const baseApi = {
  listIssues: () => {
    return api.get<Issue[]>('/repos/zeals-co-ltd/technical_debts/issues')
  }
};

export default baseApi