import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useCookies } from "react-cookie";

function NavBar() {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const haldeLogOut = () => {
    removeCookie("userToken");
    removeCookie("loggedin");
    // dispatch(accountReset(null));
    window.location.href = "/login";
  };
  return (
    <>
      <nav
        class="bg-white border-blue-200 dark:bg-gray-900"
        style={{ boxShadow: "0 0 10px 0 #423d3d4a" }}
      >
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="https://flowbite.com"
            class="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Blog App
            </span>
          </a>
          <div class="flex items-center space-x-6 rtl:space-x-reverse">
            <a
              onClick={haldeLogOut}
              class="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
            >
              Logout
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
