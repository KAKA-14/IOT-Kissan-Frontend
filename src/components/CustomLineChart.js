import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class CustomLineChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.fetchData();
    // Refresh data
    this.interval = setInterval(this.fetchData, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchData = () => {
    fetch('https://api.thingspeak.com/channels/2474084/feeds.json?results=20')
      .then(response => response.json())
      .then(data => {
        // Extract temperature data from the response
        const temperatures = data.feeds.map(feed => ({
          name: feed.entry_id,
          temperature: parseFloat(feed.field1),
        }));
        console.log('Fetched data:', temperatures); // Log fetched data to console
        this.setState({ data: temperatures }); // Reverse to show latest first
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  render() {
    const { chartWidth, chartHeight, chartMargin } = this.props;

    return (
      <ResponsiveContainer width={chartWidth} height={chartHeight}>
        <AreaChart
          data={this.state.data}
          margin={chartMargin}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{ value: 'Temperature', angle: -90, position: 'insideLeft', offset: -10 }}
            domain={[0, 50]} // Set the domain to [0, 1500]
            ticks={[...Array(1).keys()].map(val => val * 25)} // Generate ticks from 0 to 1500 with interval of 25
            />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="temperature" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

CustomLineChart.defaultProps = {
  chartWidth: 1000,
  chartHeight: 315,
  chartMargin: {
    top: 30,
    right: 30,
    left: 20,
    bottom: 5,
  },
};

export default CustomLineChart;