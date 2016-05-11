'use strict';

import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import createApp from '../components/app';

class App extends Component {
  render() {
    const App = createApp(React);
    return (
      <App {...this.props}>
        {this.props.children}
      </App>
    );
  }
}

App.propTypes = { actions: PropTypes.object.isRequired };
function mapStateToProps() {
  return {};
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({}, dispatch) };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
