import Header from "../comp/header";
import Footer from "../comp/Footer";
// import MainContent from "../comp/MainContent";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import Moment from "react-moment";

const Profile = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (!user && !loading && !error) {
      navigate("/");
    }
  });

  if (loading) {
    return (
      <div>
        <Header />
        <main>
          <p>Initialising User...</p>
        </main>
        <Footer />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (user) {
    return (
      <>
        <Helmet>
          <title>Profile Page</title>
          <meta name="description" content="profile page" />
          <style type="text/css">{`
        .Light span {
          color: black;
        }
        main {
          width: 40%;
          margin: auto;
        }
    `}</style>
        </Helmet>
        <Header />

        <main
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <h6 style={{ color: "cyan" }}>
            <span>your email is:</span> {user.email}
          </h6>{" "}
          <br></br>
          <h6 style={{ color: "cyan" }}>
            <span>acount created at:</span>
            {user.metadata.creationTime}
          </h6>{" "}
          <br></br>
          <h6 style={{ color: "black" }}>
            <span>last sign in at:</span>{" "}
            <Moment fromNow date={user.metadata.lastSignInTime} />
          </h6>{" "}
          <br></br>
          <button
            style={{
              color: "black",
              backgroundColor: "red",
              border: "1px solid black",
              padding: "1rem",
              margin: "1rem",
              borderRadius: "1rem",
              cursor: "pointer",
              width: "100%",
            }}
            onClick={() => {
              user.delete();
              navigate("/Signin");
            }}
          >
            delete account
          </button>
        </main>

        <Footer />
      </>
    );
  }
};

export default Profile;
