import Header from "../comp/header";
import Footer from "../comp/Footer";
import MainContent from "../comp/MainContent";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

const Home = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <Helmet>
        <title>HOME Page</title>
        <meta name="description" content="HOMEEEEEEEEEEEE" />
      </Helmet>

      <Header />

      {user && <MainContent pageName="HOME Page" />}
      {!user && (
        <main>
          <h2 style={{color: 'cyan'}}>Please Sign in to continue...</h2>
        </main>
      )}

      <Footer />
    </>
  );
};

export default Home;
