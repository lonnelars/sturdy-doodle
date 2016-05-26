var margin = {top: 20, right: 30, bottom: 30, left: 40};
var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

d3.tsv("data.tsv", type, (error, data) => {
    x.domain(data.map((d) => d.letter));
    y.domain([0, d3.max(data, (d) => d.frequency)]);

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

    var popover, popoverText, popoverCircle;

    var popoverScale = d3.scale.linear()
        .domain([0, d3.max(data, (d) => d.frequency)])
        .range([37, 150]);

    const percent = d3.format(".3f");
    var bar = chart.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.letter))
        .attr("y", (d) => y(d.frequency))
        .attr("height", (d) => height - y(d.frequency))
        .attr("width", x.rangeBand())
        .on("mouseover", (d) => {
            popoverText.text(`${d.letter}: ${percent(d.frequency * 100)}%`);
            popoverCircle.transition().attr("r", () => popoverScale(d.frequency))
            popover.transition().style("opacity", "100");
        })
        .on("mouseout", () => {
            popover.transition().style("opacity", "0");
        });

    popover = chart.append("g")
        .attr("class", "popover")
        .style("opacity", "0");
    popoverCircle = popover.append("circle")
        .attr("class", "popover__circle")
        .attr("r", 50)
        .attr("cx", width / 2)
        .attr("cy", height / 2);
    popoverText = popover.append("text")
        .text("")
        .attr("class", "popover__text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("dy", ".25em");
});

function type(d) {
    d.frequency = +d.frequency; //coerce to number
    return d;
}

