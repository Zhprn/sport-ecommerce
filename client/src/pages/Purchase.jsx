import CartPage from "../components/Cart";
import Footer from "../components/Footer";
import ShopNavbar from "../components/Navbar";

export default function Purchase() {
    return (
        <div>
            <ShopNavbar/>
            <CartPage />
            <Footer/>
        </div>
    )
}