// src/services/CourseService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/courses';

class CourseService {
    getCourses() {
        // Enlevez la partie concernant le token pour le test
        return axios.get(API_URL);
    }
   
    getCourseById(courseId) {
        return axios.get(`${API_URL}/${courseId}`);
    }

    createCourse(course) {
        return axios.post(API_URL, course);
    }

    updateCourse(courseId, course) {
        return axios.put(`${API_URL}/${courseId}`, course);
    }

    deleteCourse(courseId) {
        return axios.delete(`${API_URL}/${courseId}`);
    }
}

export default new CourseService();
