import Dropdown from 'react-bootstrap/Dropdown';

function SignOutAction() {
  return (
    <Dropdown.Item onClick={() => window.location.reload()}>
      Sign out
    </Dropdown.Item>
  );
}

export default SignOutAction;

