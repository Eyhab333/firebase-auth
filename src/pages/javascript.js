import Header from "../comp/header";
import Footer from "../comp/Footer";
import MainContent from "../comp/MainContent";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

const Javascript = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  useEffect(() => {!user && navigate("/Signin")} )
  return (
    <>
      <Helmet>
        <title>JAVASCRIPT Page</title>
        <meta name="description" content="JAVASCRIPTTTTTTTTTTTTTTTTTTTTT" />
        <style type="text/css">{`
   
 
        
    `}</style>
      </Helmet>
      <Header />

      <MainContent pageName="JAVASCRIPT Page" />
      <Footer />
    </>
  );
};

export default Javascript;
