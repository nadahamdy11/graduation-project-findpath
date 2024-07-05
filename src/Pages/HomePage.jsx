import Main from "../Components/Main";
import Reviews from "../Components/Reviews";
import About from "../Components/About";
import Information from "../Components/Information";
import AdjApplication from "../Components/AdjApplication";
import "animate.css";

function HomePage() {
  return (
    <div>
      <Main />
      <About />
      <Information />
      <Reviews />
      <AdjApplication />
      
    </div>
  )
}

export default HomePage

