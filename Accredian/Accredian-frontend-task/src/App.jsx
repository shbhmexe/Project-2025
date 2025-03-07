import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Main from "./components/Main";
import Footer from "./components/footer"; // ✅ Corrected Import

function App() {
  return (
    <div className="dark:bg-gray-900 min-h-screen text-white transition-all overflow-x-hidden w-full">
      <Header />
      <HeroSection />
      <Main />
      <Footer /> 
    </div>
  );
}

export default App;
