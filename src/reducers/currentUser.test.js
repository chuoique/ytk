import reducerTest from 'helpers/reducerTest';
import * as actions from '../actions/currentUserActions';
import { joinPartySuccess, newPartySuccess } from 'actions/partyActions';
import currentUser from './currentUser';

describe('currentUser', () => {
  const initialState = {
    name: '',
    intent: '',
    party: '',
    homeState: 'start',
  };

  it('noops for invalid action', () => {
    const newState = currentUser(initialState, 'foo');
    expect(newState).toEqual(initialState);
  });

  reducerTest(currentUser, initialState, {
    CURRENT_USER_SET_NAME: {
      action: actions.setName('Jane'),
      expect: { name: 'Jane' },
    },

    CURRENT_USER_SET_NAME_AND_INTENT: {
      action: actions.setNameAndIntent('John', 'start'),
      expect: { name: 'John', intent: 'start' },
    },

    CURRENT_USER_SET_PARTY: {
      action: actions.setParty('a-party-id-8888'),
      expect: { party: 'a-party-id-8888' },
    },

    PARTY_JOIN_SUCCESS: {
      action: joinPartySuccess('the-party-id-1777'),
      expect: { party: 'the-party-id-1777' },
    },

    PARTY_NEW_SUCCESS: {
      action: newPartySuccess({ name: 'The Party' }, 'the-party-id-1777'),
      expect: { party: 'the-party-id-1777' },
    },
  });
});
