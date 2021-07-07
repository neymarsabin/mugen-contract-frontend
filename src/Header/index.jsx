import { Navbar, Container } from "react-bootstrap";

const Header = () => {
	return (
		<Navbar expand="lg" variant="dark" bg="dark">
			<Container>
				<Navbar.Brand href="#">Navbar</Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export default Header;
