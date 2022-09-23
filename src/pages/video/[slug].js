import { useState } from "react"
import { gql, GraphQLClient } from "graphql-request"
import Link from "next/link"
import Image from "next/image"

export const getServerSideProps = async (pageContext) => {
  const url = process.env.NEXT_PUBLIC_ENDPOINT
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPH_CMS_TOKEN}`,
    },
  })
  const pageSlug = pageContext.query.slug

  const query = gql`
    query ($pageSlug: String!) {
      video(where: { slug: $pageSlug }) {
        createdAt
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `
  const variables = {
    pageSlug,
  }

  const data = await graphQLClient.request(query, variables)
  const video = data.video

  return {
    props: {
      video,
    },
  }
}

const changeToSeen = async (slug) => {
  await fetch("/api/seen", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug }),
  })
}

const Video = ({ video }) => {
  const [watching, setWatching] = useState(false)
  return (
    <div>
      {!watching && (
        <img
          className="thumbnail"
          src={video.thumbnail.url}
          alt={video.title}
          /* width={6}
      height={4}
      layout="responsive"
      objectFit="cover" */
        />
      )}
      {!watching && (
        <div className="info">
          <h1>{video.title}</h1>
          <p>{video.tags.join(", ")}</p>
          <p>{video.description}</p>
          <Link href="/">go back</Link>
          <button
            className="video-overlay"
            onClick={() => {
              watching ? setWatching(false) : setWatching(true)
              changeToSeen(video.slug)
            }}>
            Play
          </button>
        </div>
      )}
      {watching && (
        <video className="video" width="100%" controls>
          <source src={video.mp4.url} type="video/mp4" />
        </video>
      )}
      <div
        className="info-footer"
        onClick={() => (watching ? setWatching(false) : null)}></div>
    </div>
  )
}

export default Video
