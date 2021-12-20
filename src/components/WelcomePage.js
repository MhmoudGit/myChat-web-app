import { SignIn } from "./nav";

const WelcomePage = () => {
  return (
    <div className="welcome">
      <div className="welcomeForm">
        <h1>
          myChat is a web app made for casual chating and viewing pictures
        </h1>
        <h2>sign in with your google account now and enjoy</h2>
        <SignIn />
        <p className="Footer">dont share any personal information</p>
      </div>
      <p className="Footer">Coded by Mahmoud all rights reserved © 2021</p>
    </div>
  );
};

export default WelcomePage;
