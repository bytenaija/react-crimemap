import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Types from '../store/crimes/types';
import UserTypes from '../store/user/types';

const Navbar = (props) => {
  const {
    match: { path },
  } = props;
  const defaultActive = path.substring(path.indexOf('/') + 1) || 'home';
  const [activeItem, setActiveItem] = useState(defaultActive);
  const isAuthenticated = useSelector((state) => state.User.isAuthenticated);
  const dispatch = useDispatch();
  const handleItemClick = (e, { name, url }) => {
    setActiveItem(name);
    props.history.push(url);
  };

  return (
    <div>
      <Menu pointing secondary>
        <Menu.Item
          name="home"
          url="/"
          active={activeItem === 'home'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="messages"
          url="/messages"
          active={activeItem === 'messages'}
          onClick={handleItemClick}
        />
        <Menu.Item
          url="/friends"
          name="friends"
          active={activeItem === 'friends'}
          onClick={handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="Add Incident"
            onClick={() => dispatch({ type: Types.ADD_NEW_INCIDENT, payload: 'add' })}
          />
          {isAuthenticated && (
            <Menu.Item
              url="/logout"
              name="logout"
              active={activeItem === 'logout'}
              onClick={() => dispatch({ type: UserTypes.LOGOUT })}
            />
          )}

          {!isAuthenticated && (
            <>
              <CustomMenuItem
                url="/login"
                name="login"
                active={activeItem === 'login'}
                onClick={handleItemClick}
                color="purple"
              />
              <Menu.Item
                url="/register"
                name="register"
                active={activeItem === 'register'}
                onClick={handleItemClick}
                color="teal"
              />
            </>
          )}
        </Menu.Menu>
      </Menu>
    </div>
  );
};

const CustomMenuItem = styled(Menu.Item)`
  &&&& {
    background-color: purple;
  }
`;

export default withRouter(Navbar);
