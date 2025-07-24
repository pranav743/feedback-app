import { FeedbackData } from '../types/feedback.js';
import fs from 'fs';
import path from 'path';

export class Feedbacks {

    private static instance: Feedbacks;
    private feedbacks: Map<string, FeedbackData>;
    private readonly dataFilePath: string = path.join(process.cwd(), 'feedback.json');

    private constructor() {
        this.feedbacks = new Map<string, FeedbackData>();
    }

    public static getInstance(): Feedbacks {
        if (!Feedbacks.instance) {
            Feedbacks.instance = new Feedbacks();
        }
        return Feedbacks.instance;
    }

    public async initialize() {
        await this.loadFeedbacks();
    }

    public getAllFeedbacks(): FeedbackData[] {
        return Array.from(this.feedbacks.entries()).map(([id, feedback]) => ({
            id,
            ...feedback
        }));
    }

    private async loadFeedbacks() {
        const data = await fs.promises.readFile(this.dataFilePath, 'utf-8');
        const parsedData = JSON.parse(data);
        this.feedbacks = new Map(Object.entries(parsedData));
        console.log('Feedbacks Successfully loaded from Hard-disk:', this.feedbacks.size);
        console.log('Feedbacks:', this.feedbacks);
    }

    private async saveFeedbacks() {
        const obj = Object.fromEntries(this.feedbacks);
        await fs.promises.writeFile(this.dataFilePath, JSON.stringify(obj, null, 4));
        console.log('Feedbacks Successfully saved to Hard-disk');
    }

    public async createFeedback(feedbackData: FeedbackData): Promise<FeedbackData> {
        const id = Date.now().toString();
        feedbackData.votes = 0;
        this.feedbacks.set(id, feedbackData);
        await this.saveFeedbacks();
        return feedbackData;
    }

    public async voteFeedback(id: string, value: number): Promise<string> {
        const feedback = this.feedbacks.get(id);
        if (!feedback) {
            throw new Error('Feedback not found');
        }
        feedback.votes += value;
        this.feedbacks.set(id, feedback);
        await this.saveFeedbacks();
        return id;
    }

    public async deleteFeedback(id: string): Promise<string> {
        if (!this.feedbacks.has(id)) {
            throw new Error('Feedback not found');
        }
        this.feedbacks.delete(id);
        await this.saveFeedbacks();
        return id;
    }
    
}