import { flatten } from 'lodash/array';
import { values } from 'lodash/object';
const sagasList = [

];
import { fork } from 'redux-saga/effects';
module.exports = function* () {
  yield flatten(sagasList.map(sagas => values(sagas))).map(saga => fork(saga));
};
