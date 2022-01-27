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

        const col = document.createElement('div');
        col.className = 'col';
        document.getElementById('row').appendChild(col);

        const card = document.createElement('div');
        card.className = 'card m-3';
        row.appendChild(card);

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        card.appendChild(cardBody);

        const title = document.createElement('h2');
        title.textContent = element.jobTitle;
        title.className = '';

        const company = document.createElement('h3');
        company.textContent = element.companyName;

        const location = document.createElement('h3');
        location.textContent = element.companyLocation;

        const published = document.createElement('h4');
        published.textContent = element.jobPublished;

        cardBody.appendChild(title);
        cardBody.appendChild(company);
        cardBody.appendChild(location);
        cardBody.appendChild(published);
    });
}