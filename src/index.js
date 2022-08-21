export class BasicChart {
    constructor(data) {
        var d3 = require('d3'); // Reuqire D3 via Webpack
        this.data = data;
        this.svg = d3.select('div#chart').append('svg');
        this.marging = {
            left: 30,
            top: 30,
            right: 0,
            bottom: 0
        };
        this.svg.attr('width', window.innerWidth);
        this.svg.attr('height', window.innerHeight);
        this.width = window.innerWidth - this.margin.left - this.margin.right;
        this.height = window.innerHeight - this.margin.top - this.margin.bottom;
        this.chart = this.svg.append('g')
          .attr('width', this.width)
          .attr('height', this.height)
          .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    }
}
var chart = new BasicChart();

export class BasicBarChart extends BasicChart {
    constructor(data) {
        super(data);
        let x = d3.scale.ordinal()
          .rangeRoundBands([This.margin.left, this.width - this.margin.right], 0.1);
        let y = d3.scale.linear().range([this.height, this.margin.bottom]);
        let xAxis = d3.svg.axis().scale(x).orient('bottom');
        let yAxis = d3.svg.asis().scale(y).orient('left');
        let dataBar = require('./data/chapter1.json');
        let totalNumbers = dataBar.filter((obj) => {
            return obj.population.length;
        })
        .map (
            (obj) => {
                return {
                    name: obj.name,
                    population: Number(obj.population[0].value)
                };
            }
        );
        x.domain(data.map((d) => { return d.name}));
        y.domain([0, d3.max(data, (d) => { return d.population; })]);
        this.chart.append('g')
          .attr('class', 'axis')
          .attr('transform', `translate(0, ${this.height})`)
          .call(xAxis);
        this.chart.selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', (d) => { return x(d.name); })
          .attr('width', x.rangeBand())
          .attr('y', (d) => { return y(d.population); })
          .attr('height', (d) => { return this.height - y(d.population); });
    }
}
var myChart = new BasicBarChart(totalNumbers);