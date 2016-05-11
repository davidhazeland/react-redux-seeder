import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
const reducers = {

};
module.exports = combineReducers(Object.assign(reducers, {
  routing,
  form
}));
