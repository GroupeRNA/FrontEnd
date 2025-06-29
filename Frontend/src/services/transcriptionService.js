import api from './apiConfig';
import {CREATE_TRANSCRIPTION ,LIST_TRANSCRIPTION , GET_TRANSCRIPTION , DELETE_TRANSCRIPTION , UPDATE_TRANSCRIPTION } from '../data/constants/endpoints';

export default class TranscriptionService {
  static async createTranscription(audioId, transcriptionTitle) {
    try {
      const response = await api.post(CREATE_TRANSCRIPTION, {
        "audio_id": audioId,
        "transcription_title": transcriptionTitle,
      });
      //console.log('Transcription created:', JSON.stringify(response.data, null, 2));      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  static async getAllTranscriptions() {
    try {
      const response = await api.get(LIST_TRANSCRIPTION);
      //console.log('All transcriptions:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  static async getTranscriptionById(transcriptionId) {
    try {
      const response = await api.get(`${GET_TRANSCRIPTION}${transcriptionId}/`);
     // console.log('Transcription details:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  static async updateTranscription(transcriptionId, updates) {
    try {
      const response = await api.put(
        `${UPDATE_TRANSCRIPTION}${transcriptionId}/`,
        updates
      );
      //console.log('Transcription updated:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  static async deleteTranscription(transcriptionId) {
    try {
      const response = await api.delete(`${DELETE_TRANSCRIPTION}${transcriptionId}/`);
      //console.log('Transcription deleted:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}