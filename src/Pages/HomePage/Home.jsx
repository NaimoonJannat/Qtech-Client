import Category from "./Category";
import Companies from "./Companies";
import Hero from "./Hero";

const Home = () => {
    return (
        <div>
           <Hero />
           <Companies />
           <Category />
      <PostJobBanner />
        </div>
    );
};

export default Home;