/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  Form,
  Button,
  Icon,
  Input,
  Message,
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
  const error = useSelector(state => state.User.error);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    state => state.User.isAuthenticated,
  );
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
          {error && (
            <Message negative>
              <Message.Header>Login Error</Message.Header>
              <p>{error}</p>
            </Message>
          )}
          <Form.Field>
            <label htmlFor="firstname">
              First name
              <input
                placeholder="First name"
                onChange={e => setFirstname(e.target.value)}
              />
            </label>
          </Form.Field>

          <Form.Field>
            <label htmlFor="lastname">
              Last name
              <input
                placeholder="Lastname"
                onChange={e => setLastname(e.target.value)}
              />
            </label>
          </Form.Field>

          <Form.Field>
            <label htmlFor="username">
              Username
              <input
                placeholder="Username"
                onChange={e => setUsername(e.target.value)}
              />
            </label>
          </Form.Field>

          <Form.Field>
            <label htmlFor="email">
              Email Address
              <input
                placeholder="Emaill address"
                onChange={e => setEmail(e.target.value)}
              />
            </label>
          </Form.Field>

          <Form.Field>
            <label htmlFor="password">
              Password
              {passwordVisible && (
                <Input placeholder="Password" icon>
                  <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    id="password"
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
                    onChange={e => setPassword(e.target.value)}
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
            </label>
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
  background: #ffffff;
`;

const SubmitButton = styled(Button)`
  &&&& {
    margin: 1rem 0;
    width: 40%;
  }
`;
export default withRouter(Register);
