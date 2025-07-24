import styles from "../pages/FeedbackList.module.css";

const FeedbackCard = ({ fb, handleVote, handleDelete }) => {
  return (
    <div className={styles.feedbackCard}>
      <div className={styles.cardHeader}>
        <div className={styles.userInfo}>
          <h4 className={styles.userName}>{fb.name}</h4>
          <p className={styles.userEmail}>{fb.email}</p>
        </div>
        {/* <span className={styles.feedbackId}>ID: {fb.id}</span> */}
      </div>
      <div className={styles.cardBody}>
        <p className={styles.message}>{fb.message}</p>
      </div>
      <div className={styles.cardFooter}>
        <p className={styles.voteCount}>Votes: {fb.votes}</p>
        <div className={styles.actions}>
          <button onClick={() => handleVote(fb.id, 1)} className={styles.voteButton}>
            Upvote
          </button>
          <button onClick={() => handleDelete(fb.id)} className={styles.deleteButton}>
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
