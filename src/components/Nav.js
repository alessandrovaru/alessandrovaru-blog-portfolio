
import Link from "next/link";


const Nav = () => {
    return (
      <nav class="navbar navbar-dark bg-dark ">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Alessandrovaru</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <Link class="nav-link active" aria-current="page" href="/">Home</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" href="#">Mandalas</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" href="#">Mixtapes de Caracas</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" href="#">Mandalas</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    )
  };
   
  export default Nav;