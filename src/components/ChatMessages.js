import { auth, db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import UserPic from "./UserPic";

const ChatMessages = ({ msg, uid }) => {
  const messageClass =
    uid === auth.currentUser.uid ? "messageSent" : "messageRecieved";

  const [pics, setPics] = useState([]);
  const picRef = collection(db, "userPic");
  useEffect(
    () =>
      onSnapshot(picRef, (snapshot) => {
        setPics(snapshot.docs.map((doc) => ({ ...doc.data([]), id: doc.id })));
      }),
    []
  );



  return (
    <div className={messageClass}>
      {pics.map((pic) => {
        if (pic.uid === uid) {
          return <UserPic key={pic.id} uid={uid} pic={pic.picurl} />;
        }
      })}
      <p>{msg}</p>
    </div>
  );
};

export default ChatMessages;
