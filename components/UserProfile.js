// UI component for user profile
export default function UserProfile({ user }) {
  return (
    <div className="profile-section">
      <img src={user.photoURL || "/coder.jpg"} />
      <div>
        <em>#{user.username}</em>
      </div>
      <h1>{user.displayName || "Anonymous User"}</h1>
    </div>
  );
}
