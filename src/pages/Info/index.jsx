import { Component } from 'react';
import { useParams } from 'react-router-dom';

import Empty from '../../components/Empty';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Info extends Component {
  render() {
    return <Empty message={`PAGE "{${this.props.params['*']}}" DOES NOT EXIST `} />;
  }
}

export default withParams(Info);
