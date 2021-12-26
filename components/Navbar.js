import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";
import Image from "next/image";
// Top navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.reload();
  };

  return (
    <nav className="navbar">
      <div>
        <Link href="/" passHref>
          <button className="nav-logo">code wind</button>
        </Link>
      </div>
      <div>
        {username && (
          <>
            <div className="signout">
              <button onClick={signOut}>Sign Out</button>
            </div>
            <div className="write">
              <Link href="/admin" passHref>
                <button>Write Posts</button>
              </Link>
            </div>
            <div className="profile-image">
              <Link href={`/${username}`} passHref>
                <Image
                  src={user?.photoURL || "/coder.jpg"}
                  alt="username"
                  width={50}
                  height={50}
                />
              </Link>
            </div>
          </>
        )}

        {!username && (
          <div>
            <Link href="/enter" passHref>
              <button className="login">Login</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
