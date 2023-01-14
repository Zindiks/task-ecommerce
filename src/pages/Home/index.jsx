import { Component } from 'react';
import { connect } from 'react-redux';
import { Query } from '@apollo/client/react/components';
import { useParams } from 'react-router-dom';

import { QUERY_DATA_BY_CATEGORY } from '../../graphql/queries';
import { setCategory } from '../../store/slices/headerSlice';
import CardBox from '../../components/CardBox';
import Empty from '../../components/Empty';

import Style from './Home.module.scss';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export class Home extends Component {
  componentDidUpdate() {
    this.props.onChange(this.props.params.id);
  }

  render() {
    return (
      <Query
        query={QUERY_DATA_BY_CATEGORY}
        variables={this.props.params.id ? { input: { title: this.props.params.id } } : ''}
      >
        {({ data, loading, error }) => {
          if (loading)
            return (
              <div className={Style.containerHome}>
                <div className={Style.container}>
                  {[...Array(6)].map((item) => (
                    <CardBox key={item} status={loading} />
                  ))}
                </div>
              </div>
            );
          if (error) return <Empty message={`Error: ${error.message}`} />;

          if (data?.category === null) {
            return <Empty message={'NO SUCH CATEGORY :/'} />;
          }

          return (
            <div className={Style.containerHome}>
              {this.props.params.id ? <h1>{this.props.category.toUpperCase()}</h1> : <h1>Hello</h1>}

              <div className={Style.container}>
                {data?.category &&
                  data.category.products.map((item) => (
                    <CardBox key={item.id} item={item} status={loading} />
                  ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.headerSlice.category,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (value) => dispatch(setCategory(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withParams(Home));
