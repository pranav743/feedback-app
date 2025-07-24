import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFeedbacks, deleteFeedback, upvoteFeedback } from "../utils/submit";
import Dialog from "../components/Dialog";
import FeedbackCard from "../components/FeedbackCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import styles from "./FeedbackList.module.css";

const FeedbackList = () => {
  const { data: feedbacks = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchFeedbacks,
  });

  const [showDialog, setShowDialog] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    message: "",
    type: "success", // "success" or "error"
  });

  const handleVote = async (id, count = 1) => {
    await upvoteFeedback(id, count, setDialogConfig);
    refetch();
    setShowDialog(true);
  };

  const handleDelete = async (id) => {
    await deleteFeedback(id, setDialogConfig);
    refetch();
    setShowDialog(true);
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message="Error loading feedbacks." />;

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Feedback List</h2>
          <p className={styles.description}>Customer feedback submissions</p>
        </header>
        {feedbacks.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No feedbacks available.</p>
          </div>
        ) : (
          <div className={styles.feedbackGrid}>
            {feedbacks.map((fb) => (
              <FeedbackCard
                key={fb.id}
                fb={fb}
                handleVote={handleVote}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}
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
};

export default FeedbackList;