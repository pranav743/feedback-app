import { Request, Response } from 'express';
import { FeedbackData } from './types/feedback.js';
import { feedbackDataManager } from './data/dataManager.js';
import { handleError } from './utils.js';


export const schemaCreation = async (req: Request, res: Response) => {
    const feedbackData: FeedbackData = req.body;
    try {
        const createdFeedback = await feedbackDataManager.createFeedback(feedbackData);
        res.status(201).json(createdFeedback);
    } catch (error: unknown) {
        handleError(res, error, 'Failed to create feedback');
    }
};

export const getFeedback = async (req: Request, res: Response) => {
    try {
        const feedbacks = feedbackDataManager.getAllFeedbacks();
        res.status(200).json(feedbacks);
    } catch (error: unknown) {
        handleError(res, error, 'Failed to retrieve feedback');
    }
};

export const voteFeedback = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { value } = req.body;  // +1 or -1
    const voteType = value > 0 ? 'upvote' : 'downvote';
    
    try {
        const result = await feedbackDataManager.voteFeedback(id, value);
        if (!result) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.status(200).json({ message: `${voteType} to feedback ${id}` });
    } catch (error: unknown) {
        handleError(res, error, `Failed to ${voteType} feedback`);
    }
};

export const deleteFeedback = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await feedbackDataManager.deleteFeedback(id);
        if (!result) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.status(200).json({ message: `Feedback with id ${id} deleted successfully` });
    } catch (error: unknown) {
        handleError(res, error, 'Failed to delete feedback');
    }
};