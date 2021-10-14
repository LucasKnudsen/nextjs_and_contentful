import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export const getStaticPaths = async () => {
  let response = await client.getEntries({
    content_type: 'recipe',
  })

  const paths = response.items.map((item) => {
    return {
      params: {
        slug: item.fields.slug,
      },
    }
  })

  return {
    paths: paths,
    fallback: true,
  }
}

export const getStaticProps = async ({ params }) => {
  let { items } = await client.getEntries({
    content_type: 'recipe',
    'fields.slug': params.slug,
  })

  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      recipe: items[0],
    },
    revalidate: 1,
  }
}

export default function RecipeDetails({ recipe }) {
  if (!recipe) return <div>Loading</div>

  const { featured_image, title, cooking_time, ingredients, method } = recipe.fields
  console.log(recipe)
  return (
    <div>
      <div className='banner'>
        <img src={featured_image.fields.file.url} alt='' />
        <h2>{title}</h2>
      </div>
      <div className='info'>
        <p>Takes about {cooking_time} mins to cook.</p>
        <h3>Ingredients:</h3>

        {ingredients.map((ing) => (
          <span key={ing}>{ing}</span>
        ))}
      </div>

      <div className='method'>
        <h3>Method:</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>

      <style jsx>{`
        h2,
        h3 {
          text-transform: uppercase;
        }
        img {
          height: 200px;
          width: 100%;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          content: ', ';
        }
        .info span:last-child::after {
          content: '.';
        }
      `}</style>
    </div>
  )
}
