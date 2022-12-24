import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

//styles
import "./Article.css";

//redirect user
import { useHistory } from "react-router-dom";

const Article = () => {
  const { id } = useParams();
  const url = "  http://localhost:3000/articles/" + id;
  const { data: article, isPending, error } = useFetch(url);

  //redirect
  const history = useHistory();

  //redirect errorpage with wrong/nonexistent id of article
  useEffect(() => {
    if (error) {
      //redirect
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  }, [error, history]);

  return (
    <div className="article-page">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {article && (
        <div className="article">
          <h2>{article.title}</h2>
          <h4>by {article.author}</h4>
          <p>{article.body}</p>
        </div>
      )}
    </div>
  );
};

export default Article;
