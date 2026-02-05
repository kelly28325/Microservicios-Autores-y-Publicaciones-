import api from './axios-config';

const PUBLICATION_API = '/publications';

export const publicationService = {
  createPublication: async (publicationData) => {
    try {
      return (await api.post(PUBLICATION_API, publicationData)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creating publication');
    }
  },

  getAllPublications: async () => {
    try {
      return (await api.get(PUBLICATION_API)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching publications');
    }
  },

  getPublicationById: async (id) => {
    try {
      return (await api.get(`${PUBLICATION_API}/${id}`)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching publication');
    }
  },

  changePublicationStatus: async (id, status) => {
    try {
      return (await api.patch(`${PUBLICATION_API}/${id}/status`, null, { params: { st: status } })).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error changing publication status');
    }
  },
};