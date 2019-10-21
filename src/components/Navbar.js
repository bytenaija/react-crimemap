import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Types from '../store/crimes/types';
import UserTypes from '../store/user/types';

const Navbar = props => {
  const {
    match: { path },
  } = props;
  const defaultActive =
    path.substring(path.indexOf('/') + 1) || 'home';
  const [activeItem, setActiveItem] = useState(defaultActive);
  const isAuthenticated = useSelector(
    state => state.User.isAuthenticated,
  );
  const dispatch = useDispatch();
  const handleItemClick = (e, { name, url }) => {
    setActiveItem(name);
    props.history.push(url);
  };

  return (
    <div>
      <Menu pointing secondary>
        <CustomMenu
          name="home"
          url="/"
          active={activeItem === 'home'}
          onClick={handleItemClick}
        />
        <CustomMenu
          name="incidents"
          url="/incidents"
          active={activeItem === 'incidents'}
          onClick={handleItemClick}
        />
        <CustomMenu
          url="/friends"
          name="friends"
          active={activeItem === 'friends'}
          onClick={handleItemClick}
        />
        <Menu.Menu position="right">
          <CustomMenu
            name="Add Incident"
            onClick={() =>
              dispatch({
                type: Types.ADD_NEW_INCIDENT,
                payload: 'add',
              })
            }
          />
          {isAuthenticated && (
            <>
              <CustomMenuItem
                url="/logout"
                name="logout"
                active={activeItem === 'logout'}
                onClick={() => dispatch({ type: UserTypes.LOGOUT })}
              />

              <CustomMenuItem
                icon={{ name: 'settings' }}
                url="/dashboard"
                name="dashboard"
                active={activeItem === 'dashboard'}
                onClick={handleItemClick}
              />
            </>
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
              <CustomMenu
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
    color: #ffffff;
  }
`;

const CustomMenu = styled(Menu.Item)`
  &&&& {
    color: #ffffff;
  }
`;

export default withRouter(Navbar);
