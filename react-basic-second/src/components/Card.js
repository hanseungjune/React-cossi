const Card = ({post}) => {
  // console.log(post)
  return (
    <div className="card mb-3">
      <div className="card-body">
        {post.title}
      </div>
    </div>
  );
};

export default Card;