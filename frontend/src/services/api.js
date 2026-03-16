import axios from 'axios';

// Use Vite environment variable, fallback to local instance for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchProfile = () => api.get('profile/');
export const fetchSkills = () => api.get('skills/');
export const fetchProjects = () => api.get('projects/');
export const fetchProject = (id) => api.get(`projects/${id}/`);
export const fetchExperience = () => api.get('experience/');
export const fetchBlogPosts = () => api.get('blog/');
export const fetchBlogPost = (slug) => api.get(`blog/${slug}/`);
export const sendContactMessage = (data) => api.post('contact/', data);

export default api;
