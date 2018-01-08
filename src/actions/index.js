import axios from 'axios';

export const GET_METRICS  = 'GET_METRICS';
export const GET_METRIC_DATA  = 'GET_METRIC_DATA';

const metric_url = 'http://localhost:8000/api/metrics';

export function getMetrics() {
    return dispatch => {
        return axios.get(metric_url)
            .then(response => {
                return response.data;
            })
            .then(metrics => {
                dispatch({
                    type: GET_METRICS,
                    metrics
                })
            });
    };
}

export function getMetricData(metric_data) {
    console.log("getMetricData metric_data:", metric_data);
    return dispatch => {
        return axios.get(`${metric_url}/${metric_data}`)
            .then(response => {
                return response.data;
            })
            .then(data => {
                dispatch({
                    type: GET_METRIC_DATA,
                    data
                })
            });
    };
}