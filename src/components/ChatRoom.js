import ChatMessages from "./ChatMessages";
import { auth, db } from "./firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { FiSend } from "react-icons/fi";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);

  const messageRef = collection(db, "messages");
  const q = query(messageRef, orderBy("createdAt"), limit(25));
  useEffect(
    () =>
      onSnapshot(q, (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ ...doc.data([]), id: doc.id }))
        );
      }),
    []
  );

  const autoScroll = useRef();

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    // const messageDoc = doc(db, 'messages');
    const { uid } = auth.currentUser;
    await addDoc(messageRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
    });

    await setFormValue("");

    await autoScroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="chatroom">
        {messages.map((message) => (
          <ChatMessages key={message.id} msg={message.text} uid={message.uid} />
        ))}
        <div ref={autoScroll}></div>
      </div>
      <form className="textPlace" onSubmit={sendMessage}>
        <input
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          required
        />
        <button type="submit">
          <FiSend />
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
