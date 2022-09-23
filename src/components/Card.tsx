import React from "react"
import Image from "next/image"
import { ISection } from "pages"

interface IProps {
  title: string
  thumbnail: ISection["videos"]
}

const Card = ({ ...props }: ISection) => {
  return (
    <div>
      <Image
        className=" bg-contain rounded-md"
        src={props.videos.thumbnail.url}
        alt={`${props.title} movie poster`}
        width={200}
        height={300}
      />
    </div>
  )
}
export default Card
