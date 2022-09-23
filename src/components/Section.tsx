import React from "react"
import { ISection } from "pages"
import Card from "./Card"

interface IProps {
  title: string
  videos: ISection[]
}

const Section = ({ title, videos }: ISection) => {
  return (
    <div className="flex flex-col gap-4 mx-4 my-6">
      <h3 className="text-gray-200 text-2xl font-bold">{title}</h3>
      <div className="flex flex-row gap-4 w-full mx-4">
        {videos.map((video) => (
          <a key={video.id} href={`/video/${video.slug}`}>
            <Card thumbnail={video.thumbnail} title={`/video/${video.slug}`} />
          </a>
        ))}
      </div>
    </div>
  )
}
export default Section
