import { Navbar, Container } from "react-bootstrap";

const Header = ({ account }) => {
	return (
    <Navbar expand="lg" variant="dark" bg="dark">
      <Container>
				<Navbar.Brand href="#">Navbar { account }</Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export default Header;
