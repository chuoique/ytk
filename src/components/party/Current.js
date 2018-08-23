import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import * as partyActions from 'actions/partyActions';
import IconButtonWithTooltip from 'components/ytk/IconButtonWithTooltip';
import { findUserNameFromId } from 'helpers/party';
import {
  currentVideoShape,
  currentUserShape,
  arrayOfProfiles,
} from 'components/propTypes';
import PlaybackButton from './PlaybackButton';
import SkipButton from './SkipButton';
import styles from './Current.styles.js';

export class Current extends Component {
  static propTypes = {
    className: PropTypes.string,
    current: currentVideoShape,
    users: arrayOfProfiles,
    currentUser: currentUserShape.isRequired,
    onOpenStandalonePlayer: PropTypes.func,
    openStandalonePlayer: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.handleStandalonePlayer = this.handleStandalonePlayer.bind(this);
    this.handlePlayerToggle = this.handlePlayerToggle.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleStandalonePlayer() {
    const { currentUser } = this.props;
    const url = `${window.location}/player`;
    window.open(url, `Okee ${currentUser.name}`);
    this.props.onOpenStandalonePlayer();
  }

  handlePlayerToggle() {
    const { current, dispatch } = this.props;
    dispatch(partyActions.setPlayback(!current.isPlaying));
  }

  handleNext() {
    const { dispatch } = this.props;
    dispatch(partyActions.skip());
  }

  renderStandAloneControl() {
    const { openStandalonePlayer } = this.props;
    if (openStandalonePlayer) {
      return null;
    }
    return (
      <IconButtonWithTooltip
        tooltipTitle="Open player in new window"
        onClick={this.handleStandalonePlayer}
      >
        <OpenInNewIcon />
      </IconButtonWithTooltip>
    );
  }

  render() {
    const { current, users, classes } = this.props;

    return (
      <Card square className={classes.card} elevation={0}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography className={classes.title} color="textSecondary">
              Currently Playing:
            </Typography>
            <Typography variant="headline">{current.title}</Typography>
            <Typography variant="subheading" color="textSecondary">
              {current.channelTitle}
              <br />
              Added by:{' '}
              <strong>{findUserNameFromId(current.addedBy, users)}</strong>
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <div className={classes.playerControls}>
              <PlaybackButton
                isPlaying={current.isPlaying}
                onClick={this.handlePlayerToggle}
              />
              <SkipButton onClick={this.handleNext} />
            </div>
            <div className={classes.miscControls}>
              {this.renderStandAloneControl()}
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default connect(state => {
  const { party, currentUser } = state;

  return {
    currentUser,
    current: party.current,
    users: party.users,
  };
})(withStyles(styles)(Current));
