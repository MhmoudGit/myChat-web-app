import { auth } from "./firebase";

const UserPic = ({ pic, uid }) => {
  const profilePic =
    uid === auth.currentUser.uid ? "picOfSent" : "picOfRecieved";

  return (
    <div>
      <img className={profilePic} src={pic} alt="userpic" />
    </div>
  );
};

export default UserPic;
