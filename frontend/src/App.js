import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { useState } from 'react';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import Container from 'react-bootstrap/Container';
import Footer from './components/Footer';
// import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
// import Button from 'react-bootstrap/Button';
import SearchBox from './components/SearchBox';

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container '
          // fullBox
          //   ? 'd-flex flex-column site-container active-cont full-box'
          //   :
          // : fullBox
          // ? 'd-flex flex-column site-container full-box'
          // : 'd-flex flex-column site-container '
        }
      >
        <header>
          <nav className="main-nav d-flex justify-content-between w-100 px-2">
            <button
              className="nav-icon"
              style={{ background: 'transparent', border: 'none' }}
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <img src="/images/menu.png" alt="menu-icon" />
            </button>
            <div className="d-flex flex-column justify-content-between align-items-center logo">
              <Link to="/">
                <img className="img-large" src="/images/logo.jpg" alt="logo" />
              </Link>
            </div>

            <div className="nav-icon align-self-center">
              <Link to="/cart">
                <img src="/images/cart.png" alt="logo" />
              </Link>
            </div>
          </nav>
          <div className="search-container d-flex justify-content-center align-items-center">
            <SearchBox />
          </div>
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : ' side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>

            <Nav.Item>
              <LinkContainer
                // to={`/search?category=${category}`}
                to="/whatever"
                onClick={() => setSidebarIsOpen(false)}
              >
                <Nav.Link>whatever</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
        </div>
        <main className="mt-3">
          <Container>
            {' '}
            <h1>test</h1>
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
