
document.addEventListener('DOMContentLoaded', () => {
  console.log('IronGenerator JS imported successfully!');
}, false);


// TO DO LIST

// Create a "close" button and append it to each list item
const myNodelist = document.getElementsByClassName('list-class');

for (let i = 0; i < myNodelist.length; i += 1) {
  const span = document.createElement('SPAN');
  const txt = document.createTextNode('\u00D7');
  span.className = 'close';
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
const close = document.getElementsByClassName('close');

for (let i = 0; i < close.length; i += 1) {
  close[i].onclick = function() {
    let div = this.parentElement;
    div.style.display = 'none';
  }
}

// Add a "checked" symbol when clicking on a list item
const list = document.getElementById('myUL');
list.addEventListener('click', (ev) => {
  if (ev.target.className === 'list-class') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  const li = document.createElement('li');
  const inputValue = document.getElementById('myInput').value;
  const t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert('You must write something!');
  } else {
    document.getElementById('myUL').appendChild(li);
  }
  document.getElementById('myInput').value = '';

  const span = document.createElement('SPAN');
  const txt = document.createTextNode('\u00D7');
  span.className = 'close';
  span.appendChild(txt);
  li.appendChild(span);

  for (let i = 0; i < close.length; i += 1) {
    close[i].onclick = function () {
      let div = this.parentElement;
      div.style.display = 'none';
    }
  }
}


// Flash cards.

function showAnswer() {
  document.getElementById('answer-text').style.display = 'block';
}

// CHARTS

// LOGIC CHART
function printTheChart(arrHtml, arrCSS, arrJS, arrMongo, arrReact, arrTime) {
  const options = {

    chart: {
      height: 350, type: 'bar', stacked: true,
    },
    responsive: [{ breakpoint: 480, options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } } }],
    series: [{
      name: 'HTML',
      data: arrHtml,
    }, {
      name: 'CSS',
      data: arrCSS,
    }, {
      name: 'JS',
      data: arrJS,
    }, {
      name: 'MONGO',
      data: arrMongo,
    }, {
      name: 'REACT',
      data: arrReact,
    }],

    xaxis: {
      categories: arrTime,
    },
    fill: {
      opacity: 1,
    },

    legend: {
      position: 'right',
      offsetX: 0,
      offsetY: 50,
    },
  };

  // CONNECT TO FRONT
  const chart = new ApexCharts(document.querySelector('#chart'), options);

  chart.render();
}


// ROUTE

window.onload = () => {
  axios.get('/chart')
    .then((result) => {
      // const date = result.data.createdAt;
      // console.log(date);
      const arrHtml = [];
      result.data.forEach((element) => {
        arrHtml.push(element.usedTools.htmlRange);
      });
      const arrCSS = [];
      result.data.forEach((element) => {
        arrCSS.push(element.usedTools.cssRange);
      });
      const arrJS = [];
      result.data.forEach((element) => {
        arrJS.push(element.usedTools.jsRange);
      });
      const arrMongo = [];
      result.data.forEach((element) => {
        arrMongo.push(element.usedTools.mongoRange);
      });
      const arrReact = [];
      result.data.forEach((element) => {
        arrReact.push(element.usedTools.reactRange);
      });
      const arrTime = [];
      result.data.forEach((timestamps) => {
        const date = timestamps.createdAt;
        arrTime.push(timestamps.createdAt);
      });
      printTheChart(arrHtml, arrCSS, arrJS, arrMongo, arrReact, arrTime);
    })
    .catch((error) => {
      console.log(error);
    });
};

