import api from './axios-config';

const AUTHOR_API = '/authors';

export const authorService = {
  createAuthor: async (authorData) => {
    try {
      return (await api.post(AUTHOR_API, authorData)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creating author');
    }
  },

  getAllAuthors: async () => {
    try {
      return (await api.get(AUTHOR_API)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching authors');
    }
  },

  getAuthorById: async (id) => {
    try {
      return (await api.get(`${AUTHOR_API}/${id}`)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching author');
    }
  },

  deleteAuthor: async (id) => {
    try {
      return (await api.delete(`${AUTHOR_API}/${id}`)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error deleting author');
    }
  },
};