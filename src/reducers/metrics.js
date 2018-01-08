import { GET_METRICS } from '../actions';

export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_METRICS:
            return action.metrics;
        default:
            return state;
    }
}