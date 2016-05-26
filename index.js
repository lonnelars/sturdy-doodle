var width = 960;
var height = 500;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height)
    .append("g");

d3.tsv("data.tsv", type, (error, data) => {
    x.domain(data.map((d) => d.letter));
    y.domain([0, d3.max(data, (d) => d.frequency)]);

    var bar = chart.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.letter))
        .attr("y", (d) => y(d.frequency))
        .attr("height", (d) => height - y(d.frequency))
        .attr("width", x.rangeBand());
});

function type(d) {
    d.frequency = +d.frequency; //coerce to number
    return d;
}

