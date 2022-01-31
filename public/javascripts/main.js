'use strict';

console.log('main.js is alive');

fetch('/data')
    .then(response => response.json())
    .then(data => load(data));

let arrAllAds = [];

const load = (res) => {
    arrAllAds = res;
    console.log(arrAllAds);

    arrAllAds.forEach((element, counter) => {

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
        link.target = 'blank';

        const divCollapse = document.createElement('div');
        divCollapse.className = 'collapse';
        divCollapse.id = 'divCollapse' + counter;

        const descShort = document.createElement('p');
        descShort.id = 'descShort ' + counter;
        descShort.style.display = 'block';

        let descSplit = element.jobDescription.split(' ');

        descSplit.forEach((element, counter) => {
            if (counter < 31) {
                descShort.innerHTML += `${element} `;
            }
            if (counter == 31) {
                descShort.innerHTML += '...';
            }
        });

        const btnCollapse = document.createElement('button');
        btnCollapse.textContent = 'Visa mer';
        btnCollapse.className = 'btn btn-primary my-3';
        btnCollapse.type = 'button';
        btnCollapse.id = 'btnCollapse ' + counter;
        btnCollapse.setAttribute('data-bs-toggle', 'collapse');
        btnCollapse.setAttribute('data-bs-target', '#divCollapse' + counter);
        btnCollapse.setAttribute('aria-expanded', 'false');
        btnCollapse.setAttribute('aria-controls', 'divCollapse' + counter);
        btnCollapse.addEventListener('click', hideShortDesc);

        const descLong = document.createElement('p');
        descLong.innerHTML = element.jobDescription;
        descLong.className = 'card card-body';

        document.getElementById('colAds').appendChild(card);
        card.appendChild(cardBody);
        cardBody.appendChild(title);
        cardBody.appendChild(star);
        cardBody.appendChild(company);
        cardBody.appendChild(location);
        cardBody.appendChild(published);
        cardBody.appendChild(btnCollapse);
        cardBody.appendChild(link);
        cardBody.appendChild(divCollapse);
        cardBody.appendChild(descShort);
        divCollapse.appendChild(descLong);
    });
}

const clickStar = (event) => {
    event.target.classList.replace('bi-star', 'bi-star-fill');
    const index = event.target.id.split(' ')[1];

    // Can star an ad only once
    if (document.getElementById('cardStar ' + index) != null) {
        return;
    }

    const colAds = document.getElementById('colAds');
    colAds.classList.replace('col-12', 'col-6');

    if (document.querySelector('#colAdsStar') == null) {
        const colAdsStar = document.createElement('div');
        colAdsStar.className = 'col col-6';
        colAdsStar.id = 'colAdsStar';
        document.getElementById('row').appendChild(colAdsStar);
    }

    const card = document.createElement('div');
    card.className = 'card m-3 cardStar';
    card.id = 'cardStar ' + index;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h2');
    title.textContent = arrAllAds[index].jobTitle;

    const star = document.createElement('i');
    star.className = 'bi bi-star-fill float-end btn btn-outline-secondary';
    star.id = 'unStar ' + index;
    star.addEventListener('click', unClickStar);

    const company = document.createElement('h3');
    company.textContent = arrAllAds[index].companyName;

    const location = document.createElement('h3');
    location.textContent = arrAllAds[index].companyLocation;

    const published = document.createElement('h4');
    published.textContent = arrAllAds[index].jobPublished;

    const link = document.createElement('a');
    link.className = 'bi bi-link-45deg float-end display-6';
    link.href = arrAllAds[index].jobLink;
    link.target = 'blank';

    const divCollapse = document.createElement('div');
    divCollapse.className = 'collapse';
    divCollapse.id = 'divCollapseStar' + index;

    const descShort = document.createElement('p');
    descShort.id = 'descShortStar ' + index;

    let descSplit = arrAllAds[index].jobDescription.split(' ');

    descSplit.forEach((element, counter) => {
        if (counter < 31) {
            descShort.innerHTML += `${element} `;
        }
        if (counter == 31) {
            descShort.innerHTML += '...';
        }
    });

    const btnCollapse = document.createElement('button');
    btnCollapse.textContent = 'Visa mer';
    btnCollapse.className = 'btn btn-primary my-3';
    btnCollapse.type = 'button';
    btnCollapse.id = 'btnCollapseStar ' + index;
    btnCollapse.setAttribute('data-bs-toggle', 'collapse');
    btnCollapse.setAttribute('data-bs-target', '#divCollapseStar' + index);
    btnCollapse.setAttribute('aria-expanded', 'false');
    btnCollapse.setAttribute('aria-controls', 'divCollapseStar' + index);
    btnCollapse.addEventListener('click', hideShortDescStar);

    const descLong = document.createElement('p');
    descLong.innerHTML = arrAllAds[index].jobDescription;
    descLong.className = 'card card-body';

    document.getElementById('colAdsStar').appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(star);
    cardBody.appendChild(company);
    cardBody.appendChild(location);
    cardBody.appendChild(published);
    cardBody.appendChild(btnCollapse);
    cardBody.appendChild(link);
    cardBody.appendChild(divCollapse);
    cardBody.appendChild(descShort);
    divCollapse.appendChild(descLong);
}

const unClickStar = (event) => {
    document.getElementById('cardStar ' + event.target.id.split(' ')[1]).remove();

    document.getElementById('star ' + event.target.id.split(' ')[1]).classList.replace('bi-star-fill', 'bi-star');

    if (document.querySelector('.cardStar') == null) {
        document.getElementById('colAdsStar').remove();
        document.getElementById('colAds').className = 'col-12';
    }
}

const hideShortDesc = (event) => {
    const index = event.target.id.split(' ')[1];

    const descShortHide = document.getElementById('descShort ' + index);

    if (descShortHide.style.display !== 'none') {
        descShortHide.style.display = 'none';
        document.getElementById('btnCollapse ' + index).textContent = 'Visa Mindre';

    } else {
        descShortHide.style.display = 'block';
        document.getElementById('btnCollapse ' + index).textContent = 'Visa Mer';
    }
};

const hideShortDescStar = (event) => {
    const index = event.target.id.split(' ')[1];
    const descShortHide = document.getElementById('descShortStar ' + index);

    if (descShortHide.style.display !== 'none') {
        descShortHide.style.display = 'none';
        document.getElementById('btnCollapseStar ' + index).textContent = 'Visa Mindre';

    } else {
        descShortHide.style.display = 'block';
        document.getElementById('btnCollapseStar ' + index).textContent = 'Visa Mer';
    }
};

const updateAds = () => {
    document.getElementById('updateAds').textContent = 'Detta kommer ta en stund';

    document.getElementById('spinner').classList.remove('d-none');

    fetch('/data/updateData').then(response => location.reload());
};