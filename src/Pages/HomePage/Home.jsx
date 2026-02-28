import Category from "./Category";
import Companies from "./Companies";
import Hero from "./Hero";
import PostJobBanner from "./PostJobBanner";

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