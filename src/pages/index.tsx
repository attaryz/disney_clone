import React from "react"
import { gql, GraphQLClient } from "graphql-request"
import Navbar from "../components/Navbar"
import Section from "../components/Section"

export interface ISection {
  title: string
  videos: {
    id: string
    slug: string
    // video: string
    thumbnail: string
  }[]
}

const Home = ({ videos, account }) => {
  const random = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

  const filterVideo = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre))
  }

  const unseenVideos = (videos) => {
    return videos.filter((video) => video.seen == false || video.seen == null)
  }
  const section = [
    {
      title: "Recommended for you",
      videos: unseenVideos(videos),
    },
    {
      title: "Comedy",
      videos: filterVideo(videos, "Comedy"),
    },
    {
      title: "Action",
      videos: filterVideo(videos, "Action"),
    },
    {
      title: "Adventure",
      videos: filterVideo(videos, "Adventure"),
    },
    {
      title: "Fantasy",
      videos: filterVideo(videos, "Fantasy"),
    },
  ] as ISection[]
  return (
    <>
      <Navbar account={account} />
      <div className="flex flex-col items-center justify-center w-full bg-black">
        <div className="flex flex-row justify-center w-2/4">
          {/* <img src={random(videos).thumbnail.url} alt={random(videos).title} /> */}
        </div>
        <div className="flex flex-col ">
          {section.map((section: ISection) => (
            <Section
              title={section.title}
              videos={section.videos}
              key={section.title}
            />
          ))}
        </div>
      </div>
    </>
  )
}
export default Home

export const getStaticProps = async () => {
  const url: string = process.env.NEXT_PUBLIC_ENDPOINT as string
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPH_CMS_TOKEN}`,
    },
  })
  const videosQuery = gql`
    query {
      videos {
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

  const accountQuery = gql`
    query {
      account(where: { id: "cktxkw39400lo0g55kbi1l355" }) {
        username
        avatar {
          url
        }
      }
    }
  `
  const data = await graphQLClient.request(videosQuery)
  const videos = data.videos
  const accountData = await graphQLClient.request(accountQuery)
  const account = accountData.account
  return {
    props: {
      videos,
      account,
    },
  }
}
