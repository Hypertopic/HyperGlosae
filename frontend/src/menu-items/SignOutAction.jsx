import Dropdown from 'react-bootstrap/Dropdown';

function SignOutAction({setUser, backend}) {

  const handleSignOut = () => {
    backend.deleteSession();
    setUser();
  };

  return (
    <Dropdown.Item onClick={handleSignOut}>
      Sign out
    </Dropdown.Item>
  );
}

export default SignOutAction;

