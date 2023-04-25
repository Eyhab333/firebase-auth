import Header from "../comp/header";
import Footer from "../comp/Footer";
// import MainContent from "../comp/MainContent";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import {  sendEmailVerification } from "firebase/auth";

const Home = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <>
        <Header />
        <main>Loading .......</main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <meta name="description" content="HOMEEEEEEEEEEEE" />
        </Helmet>

        <Header />

        <main>
          <h2 style={{ color: "cyan" }}>Please Sign in to continue...</h2>
        </main>

        <Footer />
      </>
    );
  }

  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />

          <main>
            welcome {user.displayName} <span>♥</span>
          </main>

          <Footer />
        </>
      );
    }

    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />

          {user && (
            <main
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              welcome {user.displayName} <span>🧡</span> <br />
              Please verify your email to continue...
              <button
          style={{backgroundColor:"cyan",color:"white",borderRadius:"10px",padding:"10px",marginTop:"10px",cursor:"pointer"}}
            onClick={() => {
              sendEmailVerification(auth.currentUser).then(() => {
                // Email verification sent!
                // ...
              });
            }}
          >
            Resend email
          </button>
            </main>
          )}

          <Footer />
        </>
      );
    }
  }

  return (
    <>
      <Helmet>
        <title>HOME Page</title>
        <meta name="description" content="HOMEEEEEEEEEEEE" />
      </Helmet>

      <Header />

      {user && (
        <main>
          welcome {user.displayName} <span>🧡</span>
        </main>
      )}
      {!user && (
        <main style={{ display: "flex", flexDirection: "column" }}>
          <h2 style={{ color: "cyan" }}>Please Sign in to continue...</h2>
          
        </main>
      )}

      <Footer />
    </>
  );
};

export default Home;
