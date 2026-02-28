import Category from "./Category";
import Companies from "./Companies";
import FeaturedJobs from "./FeaturedJobs";
import Hero from "./Hero";
import LatestJobs from "./LatestJobs";
import PostJobBanner from "./PostJobBanner";

const Home = () => {
    return (
        <div className="min-h-screen bg-white font-sans">
           <Hero />
           <Companies />
           <Category />
      <PostJobBanner />
       {/* <FeaturedJobs /> */}
      {/* <LatestJobs /> */}
        </div>
    );
};

export default Home;