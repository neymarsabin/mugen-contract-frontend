import { Nav, Navbar, Container } from "react-bootstrap";
import { Button } from 'react-bootstrap';

const Header = ({
  account,
  connectBlockChain,
  balance,
  showCollectButton,
  handleCollectBetClick
}) => {
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
          <div className="header-gaps">
            {
              showCollectButton &&
                <Button
                  variant="outline-success"
                  onClick={handleCollectBetClick}
                  title="You can still collect your bets even if your game has ended and new one is running."
                >
                  Collect Winning Bets
                </Button>
            }
          </div>
        </Nav>
			</Container>
		</Navbar>
	);
};

export default Header;
