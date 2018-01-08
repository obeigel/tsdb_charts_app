import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Bar} from 'react-chartjs-2';

injectTapEventPlugin();

class Home extends Component {
    constructor(props) {
        super(props);
        this.style = {
            margin: 30,
            padding: 30,
            
        };
        this.state = {
            label: ""
        }
        this.renderChip = this.renderChip.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentWillMount() {
        if(!this.props.metrics.length) {
            this.props.getMetrics();
        }
    }

    onClick(e) {
        e.preventDefault();
        console.log('label', e.target.innerHTML);
        //console.log('onClick props', this.props);
        this.setState({label:e.target.innerHTML})
        this.props.getMetricData(e.target.innerHTML);
    }

    renderChip(metric,i) {
        return (
            <MuiThemeProvider key={i}>
                <Chip key={i} style={{margin: 3}} 
                    onClick={this.onClick}
                    backgroundColor="#0078D7"
                    hoverBackgroundColor='#FF8C00'>
                    {metric}
                </Chip>
            </MuiThemeProvider >
        )
    }

    render() {
        console.log("Home Render props:", this.props);
        let labels = [];
        let data = [];

        for (let datapoint in this.props.data) {
            var d = new Date(0);
            d.setUTCSeconds(datapoint);
            labels.push(String(d).substr(4, 20));
            data.push(this.props.data[datapoint]);
        }

        console.log('Home tags', data);

        data.push(0);
        let chartData = {
            labels,
            datasets: [
                {
                    label: "Time Series " + this.state.label,
                    backgroundColor: '#0078D7',
                    borderColor: '#0063B1',
                    borderWidth: 1,
                    hoverBackgroundColor: '#FF8C00',
                    hoverBorderColor: '#F7630C',
                    data
                }
            ]
        }
        return (
            <MuiThemeProvider>
                <div style={this.style}>
                <div>
                    <br/>
                    <div style={{display: 'flex',flexWrap: 'wrap'}}>
                        {this.props.metrics.map((metric, index) => this.renderChip(metric, index))}
                    </div>
                    <br/>
                </div>

                <div className="chart-bar">
                    <Bar data={chartData} height={500} options={{maintainAspectRatio: false}}/>
                </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Home;