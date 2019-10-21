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

export const Login = ({ history }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    state => state.User.isAuthenticated,
  );

  const error = useSelector(state => state.User.error);
  if (isAuthenticated) {
    history.push('/');
  }
  const login = () => {
    const data = {
      password,
      email,
    };

    dispatch({ type: Types.LOGIN, payload: data });
  };
  return (
    <LoginWrapper>
      <Navbar />
      <LoginComponent>
        <h2>Login</h2>
        <Form onSubmit={login}>
          {error && (
            <Message negative>
              <Message.Header>Login Error</Message.Header>
              <p>{error}</p>
            </Message>
          )}
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
      </LoginComponent>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div``;

const LoginComponent = styled.div`
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
export default withRouter(Login);
