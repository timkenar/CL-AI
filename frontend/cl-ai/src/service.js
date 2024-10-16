// src/service.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append('title', file.name);
    formData.append('file', file);

    try {
        const response = await axios.post(`${API_BASE_URL}/documents/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Returns the document data
    } catch (error) {
        throw new Error('Error uploading document: ' + error.message);
    }
};

export const submitQuery = async (documentId, question) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/queries/`, {
            document: documentId,
            question,
        });
        return response.data; // Returns the query response
    } catch (error) {
        throw new Error('Error submitting query: ' + error.message);
    }
};
