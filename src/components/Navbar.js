import Link from "next/link"
import Image from "next/image"
import logo from "../../public/original.svg"
const Navbar = ({ account }) => {
  return (
    <div className="w-full flex flex-row items-center justify-between bg-black">
      <div className="my-4 mx-2">
        <Link href="/" passHref>
          <Image src={logo} alt="disney" width={90} height={50} />
        </Link>
      </div>
      <div className="flex flex-row items-center gap-4 mx-4 my-2">
        <div className="text-white text-sm flex flex-row gap-1">
          <span>Welcome</span>
          <span className="text-yellow-400 capitalize">{account.username}</span>
        </div>
        <Image
          src={account.avatar.url}
          alt={account.username}
          className="rounded-full w-[50px] h-[50px] bg-clip-border bg-cover border border-gray-500"
          width={50}
          height={50}
        />
      </div>
    </div>
  )
}

export default Navbar
