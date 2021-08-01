// @ts-nocheck

import * as d3 from 'd3';

const color = d3.scaleLinear()
    .domain([0, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);
const width = 1000, height = 1000
const pack = (data: any) => d3.pack()
    .size([width, height])
    .padding(3)
  (d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a: any, b: any) => b.value - a.value))

class CircleHierarchyDiagram {

    static draw(ref, data, options) {
    
        const { range } = options;

        /* Clean */
        d3.select(ref.current).selectAll("*").remove();

        const root: any = pack(data);
        let focus: any = root;
        let view: any;

        /* Base */
        const svg = d3.select(ref.current).append("svg")
            .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`) //-${width / 2} -${height / 2} ${width} ${height}
            .style("height", "100%")
            .style("width", "100%")
            .style("display", "block")
            .style("margin", "0 -14px")
            .style("cursor", "pointer")
            .on("click", (event) => zoom(event, root));
    
        /* Circles */
        const node = svg.append("g")
            .selectAll("circle")
            .data(root.descendants().slice(1))
            .join("circle")
            .attr("fill", d => d.children ? color(d.depth) : "white")
            .attr("pointer-events", (d: any) => d.parent.data.name === focus.data.name ? null : "none")
            .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
            .on("mouseout", function() { d3.select(this).attr("stroke", null); })
            .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));
    
        /* Text labels */
        const label = svg.append("g")
            .style("font", "25px sans-serif")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(root.descendants())
            .join("text")
            .style("fill-opacity", (d: any) => d.parent === root ? 1 : 0)
            .style("display", d => sum(d) > range ? "inline" : "none")
            .text((d: any) => d.data.name);

        /* Text labels */
        const tempLabel = svg.append("text")
            .style("font", "40px sans-serif")
            .attr("text-anchor", "middle")
            .attr("font-weight", 700)
            .style("display", "none")
            .text("Placeholder")
            .attr("x", 0).attr("y", `-${height / 2.5}`);
    
        zoomTo([root.x, root.y, root.r * 2]);
    
        function zoomTo(v: any) {
            const k = width / v[2];
        
            view = v;
        
            label.attr("transform", (d: any) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
            node.attr("transform", (d: any) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
            node.attr("r", (d: any) => d.r * k);
        }
    
        function zoom(event: any, d: any) {  
            focus = d;

            if(d.parent === null){
                tempLabel
                    .style("display", "none")
            } else {
                tempLabel
                    .text(d.data.name)
                    .style("display", "inline");
            }
        
            const transition: any = svg.transition()
                .duration(event.altKey ? 7500 : 750)
                .tween("zoom", d => {
                    const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
                    return t => zoomTo(i(t));
                });
        
            label
                .filter(function(d: any) { return (d.parent === focus || this.style.display === "inline") })
                .transition(transition)
                .style("fill-opacity", (d: any) => d.parent === focus ? 1 : 0)
                .on("start", function(d: any) { this.style.display = (d.parent === focus && !d.children ) || sum(d) > range ? "inline" : "none"; })
                .on("end", function(d: any) { this.style.display = (d.parent === focus && !d.children ) || sum(d) > range ? "inline" : "none"; });

            
            node
                .attr("pointer-events", (d: any) => d.depth - focus.depth <= 1 ? null : "none")
        }
    
        return svg.node();
    }
};

function sum(node: any) {
    let s = 0;
    if('value' in node) s += node.value;
    if(node === undefined || node.children === undefined) return s;
    for(let c in node.children) {
        const child = node.children[c];
        s += child.value;
    }
    return s;
}

export default CircleHierarchyDiagram;
