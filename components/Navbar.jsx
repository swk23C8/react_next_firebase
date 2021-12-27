/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import { auth } from '../lib/firebase'

export default function Navbar() {

  const { user, username } = useContext(UserContext)

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/" passHref>
            <button className="btn-logo">Four Seasons</button>
          </Link>
        </li>

        {username && (

          <>
            <li className="push-left">
              <SignOutButton />
            </li>

            <li>
              <Link href="/admin" passHref>
                <button className="btn-brown">Write Posts</button>
              </Link>
            </li>

            <li>
              <Link href={`/${username}`} passHref>
                <Image src={user?.photoURL} alt="profilePicture" width="50" height="50" />
              </Link>
            </li>
          </>
        )}

        {!username && (
          <>
            <li>
              <Link href="/enter" passHref>
                <button className="btn-blue">Log In</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>


  )
}

function SignOutButton() {

  const signOut = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.log('Error during sign out', error.message);
      toast.error('Error during sign out')
    }
  }

  return(
    <button onClick={signOut}>
      Sign Out
    </button>
  )
}