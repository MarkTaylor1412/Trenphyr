import { useUserContext } from "@/context/AuthContext";

const Profile = () => {
  const { user } = useUserContext();

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <h2 className="h3-bold md:h2-bold w-full">Profile</h2>
        <div className="flex-center flex-col gap-3">
          <img
            src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt="profile"
            height={100}
            width={100}
            className="rounded-xl"
          />

          <h3>{user.name}</h3>
          <p>@{user.username}</p>
        </div>

        <div className="flex flex-col justify-center items-start gap-3">
          <label>Email: {user.email}</label>
          <label>Bio: n/a</label>
        </div>
      </div>
    </div>
  )
}

export default Profile