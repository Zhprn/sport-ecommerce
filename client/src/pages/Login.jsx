import FormLogin from "../components/FormLogin";
import ShopNavbar from "../components/Navbar";

export default function Login() {
    return (
        <div>
            <ShopNavbar/>
            <div className="mt-3">
            <FormLogin/>
            </div>
        </div>
    )
}