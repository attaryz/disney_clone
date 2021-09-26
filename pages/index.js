import { gql, GraphQLClient } from "graphql-request";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPH_CMS_TOKEN}`,
    },
  });
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
  `;

  const accountQuery = gql`
    query {
      account(where: { id: "cktxkw39400lo0g55kbi1l355" }) {
        username
        avatar {
          url
        }
      }
    }
  `;
  const data = await graphQLClient.request(videosQuery);
  const videos = data.videos;
  const accountData = await graphQLClient.request(accountQuery);
  const account = accountData.account;
  return {
    props: {
      videos,
      account,
    },
  };
};

const Home = ({ videos, account }) => {
  const random = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  };

  const filterVideo = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  };

  const unseenVideos = (videos) => {
    return videos.filter((video) => video.seen == false || video.seen == null);
  };
  return (
    <>
      <Navbar account={account} />
      <div className="app">
        <div className="main-video">
          <img src={random(videos).thumbnail.url} alt={random(videos).title} />
        </div>
        <div className="video-feed">
          <Section
            genre={"Recommended For You"}
            videos={unseenVideos(videos)}
          />
          <Section genre={"Comedy"} videos={filterVideo(videos, "Comedy")} />
          <Section genre={"Action"} videos={filterVideo(videos, "Action")} />
          <Section
            genre={"Adventure"}
            videos={filterVideo(videos, "Adventure")}
          />
          <Section genre={"Fantasy"} videos={filterVideo(videos, "Fantasy")} />
        </div>
      </div>
    </>
  );
};
export default Home;
