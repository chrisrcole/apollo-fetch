import axios from "axios";
const baseUrl = "/api/apollos";

let token = null;

const setToken = (newToken) => {
  if (!newToken) {
    token = null;
  } else {
    token = `bearer ${newToken}`;
  }
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.get(baseUrl, config);
  const response = await request;
  return response.data;
};

const get = async (id) => {
  const request = axios.get(`/${id}`);
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};
const remove = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  await request;
  return await getAll();
};
const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const response = await request;
  return response.data;
};

export default {
  get,
  getAll,
  create,
  update,
  remove,
  setToken,
};
