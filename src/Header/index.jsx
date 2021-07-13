import { Nav, Navbar, Container } from "react-bootstrap";
import { Button } from 'react-bootstrap';

const Header = ({ account, connectBlockChain, balance }) => {
	return (
		<Navbar expand="lg" variant="dark" bg="dark">
			<Container>
				<Navbar.Brand href="#">{account}</Navbar.Brand>
        <Nav className="mr-auto">
          {
            !account &&
            <Button
              variant="outline-success"
              onClick={connectBlockChain}
            >
              Connect
            </Button>
          }
        </Nav>
			</Container>
		</Navbar>
	);
};

export default Header;
