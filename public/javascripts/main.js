'use strict';

console.log('main.js is alive');

const fetchData = fetch(
    '/data'
).then((res) => res.json());

const allData = Promise.all([fetchData]);

allData.then((res) => load(res));

let data = [];

const load = (res) => {
    data = res[0];
    console.log(data);

    data.forEach((element, counter) => {

        const card = document.createElement('div');
        card.className = 'card m-3';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const title = document.createElement('h2');
        title.textContent = element.jobTitle;

        const star = document.createElement('i');
        star.className = 'bi bi-star float-end btn btn-outline-secondary';
        star.id = 'star ' + counter;
        star.addEventListener('click', clickStar)

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

        document.getElementById('colAds').appendChild(card);
        card.appendChild(cardBody);
        cardBody.appendChild(title);
        cardBody.appendChild(star);
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

const clickStar = (event) => {
    event.target.classList.replace('bi-star', 'bi-star-fill');
    const index = event.target.id.split(' ')[1];

    const colAds = document.getElementById('colAds');
    colAds.classList.replace('col-12', 'col-6');

    if (document.querySelector('#colStar') == null) {
        const colStar = document.createElement('div');
        colStar.className = 'col col-6';
        colStar.id = 'colStar';
        document.getElementById('row').appendChild(colStar);
    }

    const card = document.createElement('div');
    card.className = 'card m-3 cardStar';
    card.id = 'cardStar ' + index;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h2');
    title.textContent = data[index].jobTitle;

    const star = document.createElement('i');
    star.className = 'bi bi-star-fill float-end btn btn-outline-secondary';
    star.id = 'unStar ' + index;
    star.addEventListener('click', unClickStar)

    const company = document.createElement('h3');
    company.textContent = data[index].companyName;

    const location = document.createElement('h3');
    location.textContent = data[index].companyLocation;

    const published = document.createElement('h4');
    published.textContent = data[index].jobPublished;

    const link = document.createElement('a');
    link.className = 'bi bi-link-45deg float-end display-6';
    link.href = data[index].jobLink;

    const divCollapse = document.createElement('div');
    divCollapse.className = 'collapse';
    divCollapse.id = 'divCollapseStar' + index;

    const descriptionShort = document.createElement('h6');

    let descriptionSplit = data[index].jobDescription.split(' ');

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
    btnDropDown.setAttribute('data-bs-target', '#divCollapseStar' + index);
    btnDropDown.setAttribute('aria-expanded', 'false');
    btnDropDown.setAttribute('aria-controls', 'divCollapseStar' + index);

    const descriptionLong = document.createElement('p');
    descriptionLong.textContent = data[index].jobDescription;
    descriptionLong.className = 'card card-body';

    document.getElementById('colStar').appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(star);
    cardBody.appendChild(company);
    cardBody.appendChild(location);
    cardBody.appendChild(published);
    cardBody.appendChild(descriptionShort);
    cardBody.appendChild(btnDropDown);
    cardBody.appendChild(link);
    cardBody.appendChild(divCollapse);
    divCollapse.appendChild(descriptionLong);
}

const unClickStar = (event) => {

    document.getElementById('cardStar ' + event.target.id.split(' ')[1]).remove();

    document.getElementById('star ' + event.target.id.split(' ')[1]).classList.replace('bi-star-fill', 'bi-star');

    if (document.querySelector('.cardStar') == null) {
        document.getElementById('colStar').remove();
        document.getElementById('colAds').className = 'col-12';
    }
}