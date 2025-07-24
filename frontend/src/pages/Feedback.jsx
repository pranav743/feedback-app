import { useState } from "react";
import { submitData, validateField } from "../utils/submit";
import styles from "./Feedback.module.css";
import Dialog from "../components/Dialog";

export default function FeedbackForm() {
    
    const [data, setData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogConfig, setDialogConfig] = useState({
        title: "",
        message: "",
        type: "success",
    });

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};
        Object.keys(data).forEach(key => {
            const error = validateField(key, data[key]);
            if (error) newErrors[key] = error;
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
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
                            onBlur={handleBlur}
                            className={styles.input}
                            placeholder="Enter your full name"
                            required
                            disabled={isSubmitting}
                        />
                        {errors.name && <p className={styles.error}>{errors.name}</p>}
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
                            onBlur={handleBlur}
                            className={styles.input}
                            placeholder="Enter your email address"
                            required
                            disabled={isSubmitting}
                        />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
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
                            onBlur={handleBlur}
                            className={styles.textarea}
                            placeholder="Please share your detailed feedback..."
                            rows={6}
                            required
                            disabled={isSubmitting}
                        />
                        {errors.message && <p className={styles.error}>{errors.message}</p>}
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
