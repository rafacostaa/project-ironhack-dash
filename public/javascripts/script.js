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







// test chart
// const options = {
//   chart: { type: 'bar'},
//   series: [{ name: 'sales', data: [30, 40, 45, 50, 49, 60, 70, 91, 125] }],
//   xaxis: { categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999] },
// };
// const chart = new ApexCharts(document.querySelector('#chart'), options);
// chart.render();


// const options = {
//     chart: {
//       height: 350, type: 'bar', stacked: true, stackType: '100%',
//     },
//     responsive: [{ breakpoint: 480, options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } } }],
//     series: [{
//       name: 'HTML',
//       data: [44, 55, 41, 67, 22, 43, 21, 49],
//     }, {
//       name: 'CSS',
//       data: [13, 23, 20, 8, 13, 27, 33, 12],
//     }, {
//       name: 'JS',
//       data: [11, 17, 15, 15, 21, 14, 15, 13],
//     }, {
//       name: 'MONGO',
//       data: [13, 23, 20, 8, 13, 27, 33, 12],
//     }, {
//       name: 'REACT',
//       data: [11, 17, 15, 15, 21, 14, 15, 13],
//     }],
  
//     xaxis: {
//       categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4'],
//     },
//     fill: {
//       opacity: 1,
//     },
  
//     legend: {
//       position: 'right',
//       offsetX: 0,
//       offsetY: 50,
//     },
//   };
  
//   const chart = new ApexCharts(document.querySelector('#chart'), options);
  
//   chart.render();