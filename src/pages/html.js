import Header from "../comp/header";
import Footer from "../comp/Footer";
import MainContent from "../comp/MainContent";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

const Html = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });

  if (loading) {
    return (
      <>
        <Header />
        <main>Loading .......</main>
        <Footer />
      </>
    );
  }

  if (user) {
    

    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HTML Page</title>
            <meta name="description" content="HTMLLLLLLLLLLLLLLLL" />
          </Helmet>
          <Header />
          <MainContent pageName="HTML Page" />
          <Footer />
        </>
      );
    }
  }
};

export default Html;
