import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../media/logo-w.png";
import bgVideo from "../media/bg-video.mp4";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";

const Login = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };

  const clientId = process.env.REACT_APP_GOOGLE_API_AUTH;

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = (res) => {
    localStorage.setItem("user", JSON.stringify(res.profileObj));
    const { name, imageUrl, googleId } = res.profileObj
  };
  const onFailure = (err) => {
    console.log("failed:", err);
    alert(err.massage);
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        {" "}
        <video
          src={bgVideo}
          type="video/mp4"
          loop
          controls={false}
          autoPlay
          muted
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 bg-blackOverlay">
          <div className="p-5 z-10">
            <img
              src={logo}
              width="330px"
              alt="logo"
              className="text-white"
            ></img>
          </div>
          <div>
            <GoogleLogin
              clientId={clientId}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              render={(props) => (
                <button
                  type="button"
                  onClick={props.onClick}
                  disabled={props.disabled}
                  className="bg-mainColor flex justify-center items-center p-3 cursor-pointer rounded-md outline-none"
                >
                  Sing in width Google <FcGoogle className="ml-3" />
                </button>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
