paggiBody = document.getElementById('paggi');
url = window.location.href.slice(0, window.location.href.indexOf('&page='));


document.addEventListener("DOMContentLoaded", () => {
    console.dir(url);
    const count = (Alcohol.collection.find().count() % 8 === 0) ? Alcohol.collection.find().count(): Alcohol.collection.find().count() + 1;
    paggiBody.innerHTML += '<li class="page-item"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';

    for (let i = 0; i<count; i++)
    {
        paggiBody.innerHTML += `<li class="page-item "><a class="page-link" href="#" >${i + 1}</a></li>`;
    }
    paggiBody.innerHTML +=  '<li class="page-item"><a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
})