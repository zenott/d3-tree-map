const dataSet = {
  videogames: {
    title: 'Video Game Sales',
    description: 'Top 100 Most Sold Video Games Grouped by Platform',
    url:
      'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json',
  },

  movies: {
    title: 'Movie Sales',
    description: 'Top 100 Highest Grossing Movies Grouped By Genre',
    url:
      'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json',
  },

  kickstarter: {
    title: 'Kickstarter Pledges',
    description:
      'Top 100 Most Pledged Kickstarter Campaigns Grouped By Category',
    url:
      'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json',
  },
};

function treemap(dataset) {
  d3.json(dataSet[dataset].url).then(data => {
    d3.select('#container')
      .append('h1')
      .text(dataSet[dataset].title)
      .attr('id', 'title');

    d3.select('#container')
      .append('h2')
      .text(dataSet[dataset].description)
      .attr('id', 'title');

    const width = 960;
    const height = 600;

    const root = d3.hierarchy(data);
    root
      .sum(d => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value);

    const treemap = d3
      .treemap()
      .size([width, height])
      .padding(1)
      .round(true);

    treemap(root);

    const color = d3.scaleOrdinal().range(d3.schemePaired);

    const svg = d3
      .select('#container')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const g = svg
      .selectAll('.node')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x0},${d.y0})`);

    g.append('rect')
      .style('width', d => d.x1 - d.x0)
      .style('height', d => d.y1 - d.y0)
      .style('fill', d => {
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      })
      .style('opacity', 0.6);

    g.append('text')
      .attr('text-anchor', 'start')
      .attr('x', 5)
      .attr('dy', 15)
      .attr('font-size', '10px')
      .attr('class', 'node-label')
      .text(d => `${d.data.name}`);
  });
}

let radValue = 'videogames';
function handleClick(myRadio) {
  console.log(myRadio.value);
  radValue = myRadio.value;
  const parent = document.getElementById('container');
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
  treemap(radValue);
}

document.addEventListener('DOMContentLoaded', () => {
  treemap(radValue);
});
