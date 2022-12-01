import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";

export default function MainNav() {
  const [Searchroute, setSearchRoute] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();

  function submitForm(e) {
    e.preventDefault();
    if (Searchroute != "") {
      router.push(`/artwork?title=true&q=${Searchroute}`);
      setSearchRoute("");
    }

    setSearchHistory((current) => [...current, `title=true&q=${Searchroute}`]);
    setIsExpanded(false);
  }

  return (
    <>
      <Navbar expand="lg" expanded={isExpanded} className="fixed-top navbar-dark bg-primary">
        <Container>
          <Navbar.Brand>ABHISHEK KUMAR SINGH</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)} />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref>
                <Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/"}>Home</Nav.Link>
              </Link>
              <Link href="/search" passHref>
                <Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/search"}>Advanced Search</Nav.Link>
              </Link>
            </Nav>
            &nbsp;
            <Form className="d-flex" onSubmit={submitForm}>
              <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" value={Searchroute} onChange={(e) => setSearchRoute(e.target.value)} />
              <Button type="submit" variant="success">
                Search
              </Button>
            </Form>
            &nbsp;
            <Nav>
            <NavDropdown title="User Name" id="basic-nav-dropdown">
              <Link href="/favourites" passHref>
                <NavDropdown.Item onClick={() => setIsExpanded(false)} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
              </Link>

              <Link href="/history" passHref>
                <NavDropdown.Item onClick={() => setIsExpanded(false)} active={router.pathname === "/history"}>Search History</NavDropdown.Item>
              </Link>
            </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
    </>
  );
}
