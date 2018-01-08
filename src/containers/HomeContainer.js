import { connect } from 'react-redux';
import Home from '../components/Home';
import { getMetrics, getMetricData } from '../actions';

function mapStateToProps(state) {
    return {
        metrics: state.metrics,
        data: state.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getMetrics: () => dispatch(getMetrics()),
        getMetricData: (metric_name) => dispatch(getMetricData(metric_name)),
    };
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeContainer;