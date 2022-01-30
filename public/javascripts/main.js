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

    data.forEach((element, counter) => {

        const card = document.createElement('div');
        card.className = 'card m-3';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const title = document.createElement('h2');
        title.textContent = element.jobTitle;
        title.className = '';

        const company = document.createElement('h3');
        company.textContent = element.companyName;

        const location = document.createElement('h3');
        location.textContent = element.companyLocation;

        const published = document.createElement('h4');
        published.textContent = element.jobPublished;

        const link = document.createElement('a');
        link.className = 'bi bi-link-45deg float-end display-6';
        link.href = element.jobLink;

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

        document.getElementById('container').appendChild(card);
        card.appendChild(cardBody);
        cardBody.appendChild(title);
        cardBody.appendChild(company);
        cardBody.appendChild(location);
        cardBody.appendChild(published);
        cardBody.appendChild(descriptionShort);
        cardBody.appendChild(btnDropDown);
        cardBody.appendChild(link);
        cardBody.appendChild(divCollapse);
        divCollapse.appendChild(descriptionLong);
    });
}