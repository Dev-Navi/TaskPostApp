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
              class="text-white cursor-pointer bg-pink-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
