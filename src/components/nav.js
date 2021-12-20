import { Link } from "react-router-dom";
import { signInWithGoogle } from "./firebase";
import { FcGoogle } from "react-icons/fc";
import { ImMenu } from "react-icons/im";
import { IoMdExit } from "react-icons/io";
import { BsChatLeftFill} from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import React, { useState } from "react";

const Nav = () => {
  const [user] = useAuthState(auth);

  return (
    <nav className="Nav">
      <h1>myChat{<BsChatLeftFill className='icon'/>}</h1>
      <ul>{user ? <SignOut /> : null}</ul>
    </nav>
  );
};

//------------------------sign out menu

export const SignOut = () => {
  const [menu, setMenu] = useState(false);

  const list = (
    <div className="signOutNav">
      <ul className="signOutNavList">
        {auth.currentUser && (
          <button className="signOut " onClick={() => auth.signOut()}>
            Sign Out
          </button>
        )}
        <Link to="/PicForm">
          <li onClick={() => setMenu(!menu)}>Profile Pic</li>
        </Link>
        <Link to="/ChatRoom">
          <li onClick={() => setMenu(!menu)}>Chat Room</li>
        </Link>
        <Link to="/">
          <li onClick={() => setMenu(!menu)}>Home</li>
        </Link>
      </ul>
      <button className="exit" onClick={() => setMenu(!menu)}>
        {<IoMdExit />}
      </button>
    </div>
  );

  return (
    <div>
      {<ImMenu className="Hamb" onClick={() => setMenu(!menu)} />}
      {menu ? list : null}
    </div>
  );
};

//-----------------------sign in

export const SignIn = () => {
  return (
    <button onClick={signInWithGoogle}>
      <FcGoogle className="google" />
      Sign In
    </button>
  );
};

export default Nav;
