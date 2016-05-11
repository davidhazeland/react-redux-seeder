require('normalize.css');
require('bootstrap-loader');
require('styles/index.scss');

import createContent from './content';

export default React => {
  const Content = createContent(React);

  const App = (props) => {
    return (
      <div className="App">
        <Content>
          {props.children}
        </Content>
      </div>
    );
  };

  App.propTypes = {};

  return App;
}
