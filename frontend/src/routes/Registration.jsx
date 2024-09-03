import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NotificationManager } from 'react-notifications';

function Registration({backend}) {

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      name: e.target[0].value,
      password: e.target[1].value,
      type: 'user',
      roles: [],
      created: new Date()
    };
    backend.putDocument(user, `_users/org.couchdb.user:${user.name}`)
      .then(() => {
        NotificationManager.success(`${user.name} is now registered!`);
        e.target.reset();
      });
  };

  return (
    <Form className="screen container" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email"/>
        <Form.Text className="text-muted">
          <p>Please use your e-mail address given by your organization
          (university company, NGO...).</p>
          <p>Do not use addresses created anonymously (such as GMail, Yahoo...).</p>
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" />
        <Form.Text className="text-muted">
          <p>Set a <b>new</b> password, a password you never used anywhere else.</p>
          <p>Especially, do not reuse the password associated with your e-mail service.</p>
        </Form.Text>
      </Form.Group>
      <Button variant="light" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Registration;

