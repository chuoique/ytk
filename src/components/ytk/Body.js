import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from './AppBar';
import Themer, { theme } from './Themer';

const primaryText = theme.palette.text.primary;
const backgroundColor = theme.palette.background.default;

const styles = {
  body: {
    backgroundColor: backgroundColor,
    color: primaryText,
    minHeight: '100vh',
  },
};

class Body extends Component {
  renderAppBar() {
    if (false) {
      return <AppBar />;
    }
    return null;
  }

  render() {
    const { classes, children } = this.props;
    return (
      <Themer>
        <div className={classes.body}>
          {this.renderAppBar()}
          {children}
        </div>
      </Themer>
    );
  }
}

Body.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Body);
