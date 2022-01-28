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

        const divDropdown = document.createElement('div');
        divDropdown.className = 'dropdown';

        const divDropdownMenu = document.createElement('div');
        divDropdownMenu.className = 'dropdown-menu';

        let descriptionSplit = element.jobDescription.split(' ');

        const descriptionShort = document.createElement('h6');

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
        btnDropDown.className = 'btn btn-secondary dropdown-toggle';

        const descriptionLong = document.createElement('p');
        descriptionLong.textContent = element.jobDescription;
        descriptionLong.className = 'dropdown-item';

        cardBody.appendChild(title);
        cardBody.appendChild(company);
        cardBody.appendChild(location);
        cardBody.appendChild(published);
        cardBody.appendChild(divDropdown);
        divDropdown.appendChild(descriptionShort);
        divDropdown.appendChild(btnDropDown);
        divDropdown.appendChild(descriptionLong);
    });
}