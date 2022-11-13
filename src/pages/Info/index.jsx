import { Component } from 'react';
import { useParams } from 'react-router-dom';
import ButtonBtn from '../../components/UI/ButtonBtn';
import Style from './Info.module.scss';
import { Link } from 'react-router-dom';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Info extends Component {
  render() {
    return (
      <div className={Style.Info}>
        <h1>
          PAGE "{this.props.params['*']}" DO NOT EXIST {':('}{' '}
        </h1>
        <div>
          <Link to="/all">
            <ButtonBtn status={'active'} title="BACK TO HOME" />
          </Link>
        </div>
      </div>
    );
  }
}

export default withParams(Info);
