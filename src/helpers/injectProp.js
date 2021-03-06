import React from 'react';

const injectProp = injectedProps => Component => {
  class InjectProp extends React.Component {
    render() {
      const newProps = { ...injectedProps, ...this.props };
      return <Component {...newProps} />;
    }
  }

  return InjectProp;
};

export default injectProp;
