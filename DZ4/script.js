const IN = [];
{
    for (let i = 0; i < 300; i++) {
        IN.push({
            rate: Math.floor(Math.random() * 20) + 1
        });
    }
}

const array = IN.slice(-30);

const OUT = array.map((el, i, array) => {
    let counter = 0;
    do {
        counter++;
        i--
    } while (array[i] && el.rate >= array[i].rate);

    return {
        rate: el.rate,
        specialRate: counter,
    }
});

console.log(OUT);
drawChart(OUT);

function drawChart(data){
    const margin = {top:40, right:0, bottom:20, left:50},
        width  = 854 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
    
    const svg = d3.select("body")
        .append("svg")
        .attr("width", "95%")
        .attr("height", "90%")
        .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom));
    
    const chart = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          
    const yScale = d3.scaleLinear()
        .range([height, 0]);
    
    const xScale = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
           
    yScale.domain([0, d3.max(data, function(d){ return d["rate"]; })]);
    xScale.domain(data.map(function(d){ return d["specialRate"]; }));

    chart.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d){ return xScale(d["specialRate"]); })
        .attr("y", function(d){ return yScale(d["rate"]); })
        .attr("height", function(d){ return height - yScale(d["rate"]); })
        .attr("width", function(d){ return xScale.bandwidth(); })
        .attr("fill", "#003366");
        
    svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .selectAll(".textlabel")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "textlabel")
        .attr("x", function(d){ return xScale(d["specialRate"]) + (xScale.bandwidth()/2); })
        .attr("y", function(d){ return yScale(d["rate"])-1; })
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "#003366")
        .attr("font-weight", "bold")
        .text(function(d){ return d3.format("")(d["specialRate"]); })

    svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(d3.axisLeft(yScale).tickFormat(d3.format("")));
    
    svg.append("g")
        .attr("transform", "translate(" + (width/2) + ", 15)")
        .append("text")
        .text("Rate & Special Rate Histogram")
        .style("text-anchor", "middle")
        .style("font-family", "Arial")
        .style("font-weight", "bold");
}