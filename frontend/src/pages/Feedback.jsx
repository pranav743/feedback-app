import { useState } from "react";
import { submitData } from "../utils/submit";
import styles from "./Feedback.module.css";
import Dialog from "../components/Dialog";

export default function FeedbackForm() {
    
    const [data, setData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogConfig, setDialogConfig] = useState({
        title: "",
        message: "",
        type: "success",
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await submitData(e, data, setData, setDialogConfig);
        setData({ name: "", email: "", message: "" });
        setIsSubmitting(false);
        setShowDialog(true);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Share Your Feedback</h2>
                    <p className={styles.description}>Help us improve our services by sharing your thoughts and suggestions.</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="Enter your full name"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="Enter your email address"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="message" className={styles.label}>
                            Your Feedback *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={data.message}
                            onChange={handleChange}
                            className={styles.textarea}
                            placeholder="Please share your detailed feedback..."
                            rows={6}
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ""}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className={styles.spinner}></span>
                                Submitting...
                            </>
                        ) : (
                            "Submit Feedback"
                        )}
                    </button>
                </form>
            </div>

            <Dialog
                isOpen={showDialog}
                onClose={() => setShowDialog(false)}
                title={dialogConfig.title}
                message={dialogConfig.message}
                type={dialogConfig.type}
            />
        </>
    );
}
