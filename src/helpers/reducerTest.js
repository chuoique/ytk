function throwForUndefinedActionOrExpect(action, expect) {
  if (action === undefined || expect === undefined) {
    throw Error('Please provide "action" and "expect" fields in test data');
  }
}

function throwForWrongActionType(action, actionType) {
  if (action.type !== actionType) {
    throw Error(
      `This test was meant for '${actionType}' but ` +
        `instead received action of type '${action.type}'`
    );
  }
}

export default function reducerTest(reducer, initialState, testData) {
  it('has correct initial state', () => {
    expect(reducer()).toEqual(initialState);
  });

  Object.entries(testData).forEach(([actionInstance, data]) => {
    const match = actionInstance.match(/(\S+) (.+)$/);

    const [actionInfo, actionType] = match
      ? [`${match[1]} ${match[2]}`, match[1]]
      : [actionInstance, actionInstance];

    it(`handles ${actionInfo}`, () => {
      const { action, from } = data;

      throwForUndefinedActionOrExpect(action, data.expect);
      throwForWrongActionType(action, actionType);

      const previousState = { ...reducer(), ...(from || {}) },
        actual = reducer(previousState, action),
        expected = { ...reducer(), ...data.expect };
      expect(actual).toEqual(expected);
    });
  });
}
