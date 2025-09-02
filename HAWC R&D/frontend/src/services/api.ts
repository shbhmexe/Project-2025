import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Configure axios
axios.defaults.baseURL = API_URL;

// Add a request interceptor to add the token to all requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Teacher types
export interface Teacher {
  id: number;
  user_id: number;
  university_name: string;
  gender: string;
  year_joined: number;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export interface TeacherInput {
  user_id: number;
  university_name: string;
  gender: string;
  year_joined: number;
}

// Teacher API calls
export const teacherApi = {
  getAll: async (): Promise<Teacher[]> => {
    const response = await axios.get('/teachers');
    return response.data.teachers;
  },

  getById: async (id: number): Promise<Teacher> => {
    const response = await axios.get(`/teachers/${id}`);
    return response.data.teacher;
  },

  create: async (teacherData: TeacherInput): Promise<Teacher> => {
    const response = await axios.post('/teachers', teacherData);
    return response.data.teacher;
  },

  update: async (id: number, teacherData: Partial<TeacherInput>): Promise<Teacher> => {
    const response = await axios.put(`/teachers/${id}`, teacherData);
    return response.data.teacher;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`/teachers/${id}`);
  }
};