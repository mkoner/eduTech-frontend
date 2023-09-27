import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/'; // replace with your Django backend URL
const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

export const getToken = () => localStorage.getItem("token") ? localStorage.getItem("token") : null;

export const fetchAdmins = async (filters) => {
    const response = await axios.get(`${API_URL}admins`, {
        headers: {
          'Authorization': `Token ${token}`
        },
        params: filters
      });
    return response.data;
};

export const fetchLearners = async (filters) => {
    const response = await axios.get(`${API_URL}learners`, {
        headers: {
          'Authorization': `Token ${token}`
        },
        params: filters
      });
    return response.data;
};

export const fetchCourses = async (filters) => {
    const response = await axios.get(`${API_URL}courses`, {
        params: filters
      });
    return response.data;
};

export const adminLogin = async (data) => {
    try {
        const response =  await axios.post(`${API_URL}admins/login`, data);
        return response.data;
    }
    catch(err) {
        return err.message;
    }   
}

export const learnerLogin = async (data) => {
    try {
        const response =  await axios.post(`${API_URL}learners/login`, data);
        return response.data;
    }
    catch(err) {
        return err.message;
    }   
}

export const getAdminById = async (id) => {
    const response = await axios.get(`${API_URL}admins/${id}`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
    return response.data;
};

export const updateAdmin = async (id, data) => {
    const response = await axios.put(`${API_URL}admins/${id}`, data, {
        headers: {
          'Authorization': `Token ${token}`
        },
      });
    return response.data;
};

export const getLearnerById = async (id) => {
    const response = await axios.get(`${API_URL}learners/${id}`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
    return response.data;
};

export const updateLearner = async (id, data) => {
    const response = await axios.put(`${API_URL}learners/${id}`, data, {
        headers: {
          'Authorization': `Token ${token}`
        },
      });
    return response.data;
};

// Add other API calls (getLearners, getCourses, etc.) here
