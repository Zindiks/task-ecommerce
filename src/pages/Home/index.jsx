import { Component } from 'react';
import CardBox from '../../components/CardBox';
import { connect } from 'react-redux';
import Style from './Home.module.scss';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
    };
  }

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  render() {
    return (
      <div className={Style.containerHome}>
        {this.props.data && (
          <>
            <h1>{this.props.category.toUpperCase()}</h1>
            <div className={Style.container}>
              {this.props.data &&
                this.props.data.data.category.products.map((item) => (
                  <CardBox key={item.id} item={item} status={this.props.status} />
                ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.headerSlice.category,
  data: state.productSlice.data,
  status: state.productSlice.status,
});
export default connect(mapStateToProps)(Home);
