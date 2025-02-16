import FeatureCards from "../featureCard";
import Features from "../features";
import Footer from "../footer";
import Future from "../future";
import GetStarted from "../getStarted";
import Hero from "../hero";
import Navbar from "../navbar";
import Problem from "../problem";

export default function HomeSection () {
    return (
        <div>
            <Navbar/>
            <Hero/>
            <Problem/>
            {/* <FeatureCards/> */}
            <Features/>
            <GetStarted/>
            <Future/>
            <Footer/>
        </div>
    )
};