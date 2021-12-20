import { serverTimestamp, setDoc, doc } from "@firebase/firestore";
import Aos from "aos";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";

const PicForm = () => {
  const picRef = doc(db, "userPic", auth.currentUser.uid);
  const [formValue, setFormValue] = useState("");

  const sendUrl = async (e) => {
    e.preventDefault();
    // const messageDoc = doc(db, 'messages');
    const { uid } = auth.currentUser;
    await setDoc(picRef, {
      picurl: formValue,
      createdAt: serverTimestamp(),
      uid,
    });
  };

  useEffect(() => 
    Aos.init()
  , [])

  return (
    <form data-aos="flip-right" onSubmit={sendUrl} className="picForm">
      <img src={formValue} alt='' width="100px" />
      <label>Enter url of profile picture you want to use:</label>
      <input
        className="picUrl"
        type="url"
        value={formValue}
        onChange={(e) => setFormValue(e.target.value)}
        required
      />

      <input className="next" type="submit" value="Update" />
    </form>
  );
};

export default PicForm;
