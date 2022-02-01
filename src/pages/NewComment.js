//      "https://react-getting-started-500d2-default-rtdb.firebaseio.com//meetups.json",

import { useHistory } from 'react-router-dom';
import NewCommentForm from '../components/comments/NewCommentForm';

function NewCommentPage() {
  const history = useHistory();

  function addCommentHandler(commentData) {
    fetch(
      'https://react-getting-started-500d2-default-rtdb.firebaseio.com//meetups.json',
      {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(() => {
      // history.push("/"); // can use Back button afterward
      history.replace('/'); // cannot use Back button afterward
    });
  }

  return (
    <section>
      <h1>Nouveau commentaire</h1>
      <NewCommentForm onAddComment={addCommentHandler} />
    </section>
  );
}

export default NewCommentPage;
