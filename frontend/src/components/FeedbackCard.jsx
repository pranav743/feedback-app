import styles from "../pages/FeedbackList.module.css";

const FeedbackCard = ({ fb, handleVote, handleDelete }) => {

  const voteCount = fb.votes;
  const isPositive = voteCount > 0;
  const voteColor = isPositive ? "green" : voteCount < 0 ? "red" : "inherit";
  const voteSign = isPositive ? "+" : voteCount < 0 ? "-" : "";

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
        <p
          className={styles.voteCount}
          style={{ fontWeight: "bold" }}
        >
          <span style={{ color: voteColor }}>{voteSign}{Math.abs(voteCount)}</span> Votes
        </p>
        <div className={styles.actions}>
          <button
            onClick={() => handleVote(fb.id, 1)}
            className={styles.voteButton}
            title="Upvote"
            aria-label="Upvote"
          >
            ▲
          </button>
          <button
            onClick={() => handleVote(fb.id, -1)}
            className={styles.voteButton}
            title="Downvote"
            aria-label="Downvote"
          >
            ▼
          </button>
          <button
            onClick={() => handleDelete(fb.id)}
            className={styles.deleteButton}
            title="Delete"
            aria-label="Delete"
          >
            🗙
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
