import React, { Component } from "react";
import Highcharts from "highcharts";

export default class LineChart extends Component {
    componentWillReceiveProps(nextProps) {
      if (this.props.data !== nextProps.data) {
        const xAxisData = nextProps.data.map(item=>Date.parse(item.date)
            );
        const YAxisData = nextProps.data.map(item=>parseInt(item.amount));
        this.highChartsRender(xAxisData, YAxisData);
      }
    }
  
    highChartsRender(xAxisData, YAxisData) {
      Highcharts.chart("lineChart", {
        chart: {
          type: "line",
        },
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        title: false,
        xAxis: {
            accessibility: {
                rangeDescription: 'Range: 2010 to 2017'
              }
        },
        yAxis: {
          min: 12,
          title: {
            text: "Amount",
            style: {
              color: "#8D9AA9",
            },
          },
        },
        series: [
            {
            data: YAxisData
            }
        ],
      });
    }
  
    render() {
      return <div id="lineChart" className="dashboard-chart" />;
    }
  }