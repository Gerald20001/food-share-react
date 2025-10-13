import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './BlogPost.css';

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(err => console.error('Ошибка загрузки поста:', err));
  }, [id]);

  if (!post) {
    return <div className="blog-post">Загрузка...</div>;
  }

  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      <img src={post.imageUrl} alt={post.title} className="blog-image" />
      <p>{post.content || 'Полное содержание поста будет доступно скоро.'}</p>
    </div>
  );
}

export default BlogPost;