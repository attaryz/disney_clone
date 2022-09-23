import Image from "next/image"
const Card = ({ thumbnail, title }) => {
  return (
    <div>
      <Image
        className=" bg-contain rounded-md"
        src={thumbnail.url}
        alt={`${title} movie poster`}
        width={200}
        height={300}
      />
    </div>
  )
}
export default Card
