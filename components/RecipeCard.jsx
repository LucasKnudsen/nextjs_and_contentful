import React from 'react'
import Link from 'next/link'

const RecipeCard = ({ recipe }) => {
  const { title, slug, thumbnail, cooking_time } = recipe.fields
  return (
    <div className='card'>
      <div className='featured'>
        <img className='card-image' src={thumbnail.fields.file.url} alt={thumbnail.fields.title} />
      </div>
      <div className='content'>
        <div className='info'>
          <h4>{title}</h4>
          <p>Takes approx {cooking_time} mins to make</p>
        </div>
        <div className='actions'>
          <Link href={`/recipes/${slug}`}>
            <a>Cook this</a>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .card {
          transform: rotateZ(-1deg);
        }
        .card-image {
          width: 550px;
          height: 250px;
          object-fit: cover;
        }
        .content {
          background: #fff;
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
          margin: 0;
          position: relative;
          top: -40px;
          left: -10px;
        }
        .info {
          padding: 16px;
        }
        .info h4 {
          margin: 4px 0;
          text-transform: uppercase;
        }
        .info p {
          margin: 0;
          color: #777;
        }
        .actions {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
        }
        .actions a {
          color: #fff;
          background: #f01b29;
          padding: 16px 24px;
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}

export default RecipeCard
