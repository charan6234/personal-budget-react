import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import * as d3 from "d3";

function HomePage() {
  const chartRef = useRef(null); 
  const d3ChartRef = useRef(null); 
  const [dataSource, setDataSource] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#CC0003',
          '#45818d',
          '#c90078',
          '#783f09',
          '#ffcd51',
          '#ff6383',
          '#36a2e0',
          '#fd6b19',
          '#f6b26f'
        ]
      }
    ],
    myBudget: []
  });

  function createChart() {
    const ctx = chartRef.current.getContext("2d");
    if (window.myPieChart) {
      window.myPieChart.destroy();
    }
    window.myPieChart = new Chart(ctx, {
      type: "pie",
      data: dataSource,
    });
  }
  const populateD3jsChart = () => {
    const width = 550,
      height = 370,
      margin = 40;

    const radius = Math.min(width, height) / 2 - margin;
    const svg = d3.select(d3ChartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const data = dataSource.myBudget;

    const color = d3.scaleOrdinal().range(d3.schemeDark2);

    const pie = d3.pie().value((d) => d.budget);
    const data_ready = pie(data);

    const arc = d3.arc()
      .innerRadius(radius * 0.45)
      .outerRadius(radius * 0.8);

    const outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    svg.selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.title))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    svg.selectAll('allPolylines')
      .data(data_ready)
      .enter()
      .append('polyline')
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr('points', function (d) {
        const posA = arc.centroid(d);
        const posB = outerArc.centroid(d);
        const posC = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
        return [posA, posB, posC];
      });
    svg.selectAll('allLabels')
      .data(data_ready)
      .enter()
      .append('text')
      .text(d => `${d.data.title} (${d.data.budget})`)
      .attr('transform', function (d) {
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .style('text-anchor', function (d) {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return (midangle < Math.PI ? 'start' : 'end');
      });
  };

  useEffect(() => {
    axios.get('/budget-data.json')
      .then((res) => {
        const updatedData = res.data.myBudget.map((item) => ({
          title: item.title,
          budget: item.budget
        }));
        setDataSource((prevDataSource) => ({
          ...prevDataSource,
          labels: updatedData.map(item => item.title),
          datasets: [
            {
              ...prevDataSource.datasets[0],
              data: updatedData.map(item => item.budget),
            }
          ],
          myBudget: updatedData,
        }));
      });
  }, []);

  useEffect(() => {
    if (dataSource.myBudget.length > 0) {
      createChart(); 
      populateD3jsChart(); 
    }
  }, [dataSource]);

  return (
    <main className="container center">
      <section className="page-area">
        <article className="text-box">
          <h2>Stay on Track</h2>
          <p>
            Do you know where you are spending your money? If you really stop to track it down,
            you would get surprised! Proper budget management depends on real data... and this
            app will help you with that!
          </p>
        </article>

        <article className="text-box">
          <h2>Alerts</h2>
          <p>
            What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
          </p>
        </article>

        <article className="text-box">
          <h2>Results</h2>
          <p>
            People who stick to a financial plan, budgeting every expense, get out of debt faster!
            Also, they live happier lives... since they spend without guilt or fear...
            because they know it is all good and accounted for.
          </p>
        </article>

        <article className="text-box">
          <h2>Chart</h2>
          <p>
            <canvas id="myChart" ref={chartRef} width="400" height="400"></canvas>
          </p>
        </article>

        <article className="text-box">
          <h2>D3JS Chart</h2>
          <p>
            <svg id="d3jsChart" ref={d3ChartRef} width="500" height="400"></svg>
          </p>
        </article>
      </section>
    </main>
  );
}

export default HomePage;
