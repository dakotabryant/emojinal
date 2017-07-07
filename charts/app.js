let ctx = document.getElementById('canvas').getContext('2d');
let dates = [];
let learnedData = [];
let toLearnData = [];

let data = [{
  date: 10000000000,
  learned: 0,
  toLearn: 25
},
{
  date: 20000000000,
  learned: 2,
  toLearn: 23
},
{
  date: 30000000000,
  learned: 5,
  toLearn: 20
},
{
  date: 40000000000,
  learned: 5,
  toLearn: 20
},
{
  date: 50000000000,
  learned: 10,
  toLearn: 15
},
{
  date: 60000000000,
  learned: 20,
  toLearn: 5
}];

data.forEach(el=>{
  dates.push(el.date);
  learnedData.push(el.learned);
  toLearnData.push(el.toLearn);
})
console.log(dates)
let days = dates
days = days.map(el=>{
  let d = new Date(el);
  console.log(d)
  return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
});


let myChart = new Chart(ctx,{
  type: 'line',
  data:{
    labels: days,
    datasets: [{
      label: "Learned",
      data: learnedData,
      backgroundColor: [
        'rgba(255,255,255,0.1)'
      ],
      borderColor: [
        '#ff6384'
      ]
    },
    {
      label: "Still to learn",
      data: toLearnData,
      backgroundColor: [
        'rgba(0,0,0,0.1)'
      ],
      borderColor: [
        '#36a2eb'
      ]
    }

    ]
  }
});
