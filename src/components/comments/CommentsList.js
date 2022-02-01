/*  */
import CommentItem from './CommentItem';
import classes from './CommentList.module.css';

function CommentsList(props) {
  return (
    <ul className={classes.list}>
      {props.comments.map((comment) => (
        <CommentItem
          key={comment.id}
          id={comment.id}
          image={comment.image}
          title={comment.title}
          address={comment.address}
          description={comment.description}
        />
      ))}
    </ul>
  );
}

export default CommentsList;
