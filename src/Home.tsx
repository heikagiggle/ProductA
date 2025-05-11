import Footer from "./components/footer/Footer";
import GetStarted from "./components/get-started/GetStarted";
import Navbar from "./components/navbar/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <GetStarted />
      </main>
      <Footer />
    </div>
  );
};



export default Home;
