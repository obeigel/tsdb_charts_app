import { GET_METRIC_DATA } from '../actions';

export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_METRIC_DATA:
            return action.data;
        default:
            return state;
    }
}