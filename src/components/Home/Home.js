import Header from "../Header";
import SkyHome from "../SkyHome";
import Sections from "../Sections";

const Home = ({setSigner}) => {
  return(
    <div>
      <Header setSigner={setSigner} bl={false}/>
      <SkyHome/>
      <Sections/>
    </div>
  );
};

export default Home;