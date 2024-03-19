import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class Ec extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.fetchData();
    // Refresh data
    this.interval = setInterval(this.fetchData, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchData = () => {
    fetch('https://api.thingspeak.com/channels/2474084/feeds.json?results=100n')
      .then(response => response.json())
      .then(data => {
        // Extract EC (Electrical Conductivity) data from the response (field2)
        const ecData = data.feeds.map(feed => ({
          time: new Date(feed.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          ec: parseFloat(feed.field2), // Extract EC data from field2
        }));
        console.log('Fetched data:', ecData); // Log fetched data to console
        this.setState({ data: ecData });
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
          <CartesianGrid strokeDasharray="1 "  strokeOpacity={0.5}/>
          <XAxis dataKey="time" label={{ value: 'Time', position: 'insideBottom', offset: -10 }} />
          <YAxis
            label={{ value: 'EC', angle: -90, position: 'insideLeft', offset: -10 }}          />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="ec" stroke="#8884d8" fill="url(#colorGradient)" />
          {/* Define gradient */}
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="black" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="black" stopOpacity={0}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

Ec.defaultProps = {
  chartWidth: 1000,
  chartHeight: 315,
  chartMargin: {
    top: 30,
    right: 30,
    left: 20,
    bottom: 5,
  },
};

export default Ec;