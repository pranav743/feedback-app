const BASE_URL = import.meta.env.VITE_SERVER_URL + '/api' || "http://localhost:3000/api";
import axios from 'axios';

const submitData = async (e, data, setData, setDialogConfig) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${BASE_URL}/feedback`, data);
        console.log("Feedback submitted successfully:", response.data);
        setDialogConfig({
            title: "Success!",
            message: "Your feedback has been submitted successfully. Thank you for your valuable input.",
            type: "success",
        });
        
        setData({ name: "", email: "", feedback: "" });
    } catch (error) {
        console.error("Error submitting feedback:", error);
        setDialogConfig({
            title: "Error",
            message: "There was an error submitting your feedback. Please try again.",
            type: "error",
        });
    }
};

const fetchFeedbacks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/feedback`);
        console.log("Feedbacks fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
    }
};

const deleteFeedback = async (id, setDialogConfig) => {
    try {
        const response = await axios.delete(`${BASE_URL}/feedback/${id}`);
        console.log("Feedback deleted successfully:", response.data);
        setDialogConfig({
            title: "Feedback Deleted",
            message: "The feedback has been successfully removed.",
            type: "success",
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting feedback:", error);
        setDialogConfig({
            title: "Error",
            message: "There was an error deleting the feedback. Please try again.",
            type: "error",
        });
    }
};

const upvoteFeedback = async (id, count, setDialogConfig) => {
    try {
        const response = await axios.put(`${BASE_URL}/feedback/${id}/vote`, {value: count});
        console.log("Feedback upvoted successfully:", response.data);
        setDialogConfig({
            title: "Vote Recorded",
            message: "Thank you for your vote! Your feedback helps us improve.",
            type: "success",
        });
        return response.data;
    } catch (error) {
        console.error("Error upvoting feedback:", error);
        setDialogConfig({
            title: "Error",
            message: "There was an error upvoting the feedback. Please try again.",
            type: "error",
        });
    }
};

const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) {
        error = "This field is required.";
    } else if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            error = "Please enter a valid email address.";
        }
    }
    return error;
};

export { submitData, fetchFeedbacks, deleteFeedback, upvoteFeedback, validateField };
