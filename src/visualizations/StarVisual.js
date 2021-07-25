import React from 'react';
import { Box, Spinner } from 'grommet';
import * as d3 from 'd3';

const color = d3.scaleLinear()
    .domain([0, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);
const width = 1000, height = 1000
const pack = data => d3.pack()
    .size([width, height])
    .padding(3)
  (d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value))

class StarVisual extends React.Component {

  constructor(props){
    super(props);
    this.myRef = React.createRef(); 
  }

  render(){
    const { loading } = this.props;
    console.log(loading);

    d3.select(this.myRef.current).selectAll("*").remove();
    this.getChart(this.props.data);
    return(
      <Box align="center" justify="center" direction="column" fill>
        { loading && <Spinner justify="center" /> }
        <Box ref={this.myRef} fill={!loading} style={{display: loading ? "none" : "block"}}/>
      </Box>
    );
  }

  getChart(data) {
    const STARGAZER_MIN = 10000;

    const root = pack(data);
    let focus = root;
    let view;
  
    /* Base */
    const svg = d3.select(this.myRef.current).append("svg")
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`) //-${width / 2} -${height / 2} ${width} ${height}
      .style("height", "100%")
      .style("width", "100%")
      .style("display", "block")
      .style("margin", "0 -14px")
      .style("background", color(0))
      .style("cursor", "pointer")
      .on("click", (event) => zoom(event, root));
  
    /* Circles */
    const node = svg.append("g")
      .selectAll("circle")
      .data(root.descendants().slice(1))
      .join("circle")
        .attr("fill", d => d.children ? color(d.depth) : "white")
        .attr("pointer-events", d => !d.children ? "none" : null)
        .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
        .on("mouseout", function() { d3.select(this).attr("stroke", null); })
        .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));
  
    /* Text labels */
    const label = svg.append("g")
        .style("font", "30px sans-serif")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants())
      .join("text")
        .style("fill-opacity", d => d.parent === root ? 1 : 0)
        .style("display", d => sum(d) > STARGAZER_MIN ? "inline" : "none")
        .text(d => d.data.name);
  
    zoomTo([root.x, root.y, root.r * 2]);
  
    function zoomTo(v) {
      const k = width / v[2];
  
      view = v;
  
      label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("r", d => d.r * k);
    }
  
    function zoom(event, d) {  
      focus = d;
  
      const transition = svg.transition()
          .duration(event.altKey ? 7500 : 750)
          .tween("zoom", d => {
            const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return t => zoomTo(i(t));
          });
  
      label
        .filter(function(d) { return (d.parent === focus || this.style.display === "inline") })
        .transition(transition)
          .style("fill-opacity", d => d.parent === focus ? 1 : 0)
          .on("start", function(d) { if (d.parent === focus && sum(d) > STARGAZER_MIN) this.style.display = "inline"; })
          .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }
  
    return svg.node();
  }
};

function sum(node) {
  let s = 0;
  if('value' in node) s += node.value;
  if(node === undefined || node.children === undefined) return s;
  for(let c in node.children) {
    const child = node.children[c];
    s += child.value;
  }
  return s;
}


export default StarVisual;
