'use strict';

console.log('main.js is alive');

const fetchData = fetch(
    '/data'
).then((res) => res.json());

const allData = Promise.all([fetchData]);

allData.then((res) => load(res));

const load = (res) => {
    let data = res[0];
    console.log(data);

    console.log(data[0].jobTitle);

    data.forEach(element => {

        const li = document.createElement('li');
        li.textContent = element.jobTitle;
        document.getElementById('content').appendChild(li);
    });
}