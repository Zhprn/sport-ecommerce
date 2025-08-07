import FormRegister from "../components/FormRegister";
import ShopNavbar from "../components/Navbar";

export default function Register() {
    return (
        <div>
            <ShopNavbar/>
            <div className="mt-3">
            <FormRegister/>
            </div>
        </div>
    )
}