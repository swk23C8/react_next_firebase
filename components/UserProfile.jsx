import Image from 'next/image'
/* eslint-disable @next/next/no-img-element */
export default function UserProfile({ user }) {
  return (
    <div className="box-center">
      <div className="user-profile-img-wrapper">
      <Image src={user.photoURL || '/hacker.png'} className="card-img-center" alt="profile" layout="fill" />
      </div>
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || 'Anonymous User'}</h1>
    </div>
  )
}