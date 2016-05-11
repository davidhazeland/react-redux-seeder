import { flatten } from 'lodash/array';
import { values } from 'lodash/object';
const sagasList = [

];
module.exports = flatten(sagasList.map(sagas => values(sagas)));
