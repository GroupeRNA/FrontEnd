import api from '../data/api/api';
import { CREATE_AUDIO ,GET_AUDIO ,LIST_AUDIO ,DELETE_AUDIO } from '../data/constants/endpoints';

export default class AudioService {
  static async uploadAudio(file, audioTitle) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('audio_title', audioTitle);

    try {
      const response = await api.post(CREATE_AUDIO, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  static async getAllAudios() {
    try {
      const response = await api.get(LIST_AUDIO);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  static async getAudioById(audioId) {
    try {
      const response = await api.get(`${GET_AUDIO}${audioId}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  static async deleteAudio(audioId) {
    try {
      const response = await api.delete(`${DELETE_AUDIO}${audioId}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}