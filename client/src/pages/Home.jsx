import HeaderSlider from "../components/Carousel";
import Footer from "../components/Footer";
import ShopNavbar from "../components/Navbar";
import NewArrival from "../components/NewArrival";
import TestimonialSection from "../components/testimonials";

export default function Homepage() {
    return (
        <div>
            <ShopNavbar/>
            <HeaderSlider/>
            <NewArrival/>
            <TestimonialSection/>
            <Footer/>
        </div>
    )
}