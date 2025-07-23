import express from 'express';
import * as feedbackController from "./feedback.controller.js";

const router = express.Router();

router.get('/feedback', feedbackController.getFeedback);
router.post('/feedback', feedbackController.schemaCreation);
router.put('/feedback/:id/vote', feedbackController.voteFeedback);
router.delete('/feedback/:id', feedbackController.deleteFeedback);

export default router;
