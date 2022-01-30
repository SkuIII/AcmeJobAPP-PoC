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

    data.forEach(element => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthsSwedish = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];

        const publishedDateSplit = element.jobPublished.split(' ');
        const publishedYearSplit = publishedDateSplit[3].split(',');
        const publishedTimeSplit = publishedDateSplit[5].split('.');

        monthsSwedish.forEach((element, counter) => {
            if (publishedDateSplit[2] == element) {
                publishedDateSplit[2] = months[counter];
            }
        });

        const publishedDate = `${publishedDateSplit[1]} ${publishedDateSplit[2]} ${publishedYearSplit[0]} ${publishedTimeSplit[0]}:${publishedTimeSplit[1]}`;

        // console.log(publishedDateSplit);
        // console.log(publishedYearSplit);
        // console.log(publishedTimeSplit);
        console.log(publishedDate);
        console.log(Date.parse(publishedDate));
    });

    data.forEach((element, counter) => {

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

        const divCollapse = document.createElement('div');
        divCollapse.className = 'collapse';
        divCollapse.id = 'divCollapse' + counter;

        const descriptionShort = document.createElement('h6');

        let descriptionSplit = element.jobDescription.split(' ');

        descriptionSplit.forEach((element, counter) => {
            if (counter < 31) {
                descriptionShort.textContent += `${element} `;
            }
            if (counter == 31) {
                descriptionShort.textContent += '...';
            }
        });

        const btnDropDown = document.createElement('button');
        btnDropDown.textContent = 'Läs mer';
        btnDropDown.className = 'btn btn-primary my-3';
        btnDropDown.type = 'button';
        btnDropDown.setAttribute('data-bs-toggle', 'collapse');
        btnDropDown.setAttribute('data-bs-target', '#divCollapse' + counter);
        btnDropDown.setAttribute('aria-expanded', 'false');
        btnDropDown.setAttribute('aria-controls', 'divCollapse' + counter);

        const descriptionLong = document.createElement('p');
        descriptionLong.textContent = element.jobDescription;
        descriptionLong.className = 'card card-body';

        cardBody.appendChild(title);
        cardBody.appendChild(company);
        cardBody.appendChild(location);
        cardBody.appendChild(published);
        cardBody.appendChild(descriptionShort);
        cardBody.appendChild(btnDropDown);
        cardBody.appendChild(divCollapse);
        divCollapse.appendChild(descriptionLong);
    });
}