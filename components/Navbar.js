import Link from "next/link";
import Image from "next/image";
import logo from "../public/original.svg";
const Navbar = ({ account }) => {
  return (
    <div className="navbar">
      <div className="logo-wrapper">
        <Link href="/">
          <Image src={logo} alt="disney" width={90} height={50} />
        </Link>
      </div>
      <div className="account-info">
        <p>Welcome {account.username}</p>
        <img
          src={account.avatar.url}
          alt={account.username}
          className="avatar"
        />
      </div>
    </div>
  );
};

export default Navbar;
