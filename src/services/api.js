import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  }
);

export const login = (credentials) => api.post("/auth/login", credentials);
export const register = (credentials) =>
  api.post("/auth/register", credentials);

export const getConfigurations = () => api.get("/configuration");
export const createConfiguration = (configuration) =>
  api.post("/configuration", configuration);
export const updateConfiguration = (buildingType, configuration) =>
  api.put(`/configuration/${buildingType}`, configuration);
export const deleteConfiguration = (buildingType) =>
  api.delete(`/configuration/${buildingType}`);

export const getBuildingTypes = () => api.get("/buildingTypes");
export const createBuildingType = (buildingType) =>
  api.post("/buildingTypes", buildingType);
export const deleteBuildingType = (buildingType) =>
  api.delete(`/buildingTypes/${buildingType}`);
