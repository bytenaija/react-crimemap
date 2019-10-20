/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  Form, Button, Icon, Input,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Types from '../../store/user/types';

export const Register = ({ history }) => {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.User.isAuthenticated);
  if (isAuthenticated) {
    history.push('/');
  }
  const register = () => {
    const data = {
      username,
      firstname,
      lastname,
      password,
      email,
    };

    dispatch({ type: Types.REGISTER, payload: data });
  };
  return (
    <RegisterWrapper>
      <Navbar />
      <RegisterComponent>
        <h2>Register</h2>
        <Form onSubmit={register}>
          <Form.Field>
            <label>First name</label>
            <input
              placeholder="First name"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>Last name</label>
            <input
              placeholder="Lastname"
              onChange={(e) => setLastname(e.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>Username</label>
            <input
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>Email Address</label>
            <input
              placeholder="Emaill address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            {passwordVisible && (
              <Input placeholder="Password" icon>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <Icon
                  name="eye slash"
                  link
                  onClick={() => setPasswordVisible(false)}
                />
              </Input>
            )}

            {!passwordVisible && (
              <Input placeholder="Password" icon>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                />

                <Icon
                  name="eye"
                  link
                  onClick={() => setPasswordVisible(true)}
                />
              </Input>
            )}
          </Form.Field>

          <SubmitButton type="submit" color="purple">
            Submit
          </SubmitButton>
        </Form>
      </RegisterComponent>
    </RegisterWrapper>
  );
};

const RegisterWrapper = styled.div``;

const RegisterComponent = styled.div`
  width: 50%;
  margin: 10rem auto;
  padding: 2rem;
  box-shadow: 1px 1px 10px teal;
`;

const SubmitButton = styled(Button)`
  &&&& {
    margin: 1rem 1rem;
    width: 40%;
  }
`;
export default withRouter(Register);
