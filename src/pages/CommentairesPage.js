//"https://react-getting-started-500d2-default-rtdb.firebaseio.com//meetups.json"
import { useEffect, useState } from 'react';
import CommentsList from '../components/comments/CommentsList';

function CommentairesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedComments, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      'https://react-getting-started-500d2-default-rtdb.firebaseio.com/comments.json'
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const comments = [];

        for (const key in data) {
          const comment = {
            id: key,
            ...data[key],
          };

          comments.push(comment);
        }

        setIsLoading(false);
        setLoadedMeetups(comments);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Commentaires</h1>
      <CommentsList meetups={loadedComments} />
    </section>
  );
}

export default CommentairesPage;
