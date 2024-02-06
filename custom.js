document.addEventListener('DOMContentLoaded', function () {

    fixedMenu();
    checkPickUp();
    offcanvasMenu();
    thankYouPage();
    calculateImage();

    // check pick up radio change event
    document.querySelectorAll('input[name="lieferoption"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            checkPickUp();
        });
    });

    // scroll event
    window.addEventListener('scroll', function () {
        fixedMenu();
    });

});

// calcuate intro image height

function calculateImage() {

    if (window.innerWidth > 991) {

        var introBoxHeight = document.getElementById('intro').clientHeight;
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        if (introBoxHeight > viewportHeight) {
            document.querySelector('#intro .header-image').style.height = 30 + introBoxHeight + 'px';
        } else {
            document.querySelector('#intro .header-image').style.height = '';
        }

    }

}

// check pick up function
function checkPickUp() {

    if (document.querySelector('input[name="lieferoption"]')) {

        let activeRadio = document.querySelector('input[name="lieferoption"]:checked').value;

        if (activeRadio === "Abholung") {
            document.querySelector('.hiding-fields').classList.remove('d-none');
        } else {
            document.querySelector('.hiding-fields').classList.add('d-none');
        }

    }

}

// check plz

function checkPlz() {

    if (document.querySelector('input[name="plz"]')) {

        let hauptfilialePlz = '39100';
        let hauptfilialePlzFirst2 = hauptfilialePlz.substring(0, 2);
        let activeRadio = document.querySelector('input[name="lieferoption"]:checked').value;
        let formPlz = document.querySelector('input[name="plz"]').value;

        if (activeRadio === "Abholung") {
            if (formPlz.startsWith(hauptfilialePlzFirst2)) {
                return true;
            } else {
                document.querySelector('.error-form').classList.remove('d-none');
                return false;
            }
        } else {
            return true;
        }

    }

}

// fix menu on scroll
function fixedMenu() {

    if (document.querySelector('header')) {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop === 0) {
            document.querySelector('header').classList.remove('active');
        } else {
            document.querySelector('header').classList.add('active');
        }
    }

}

// open offcanvas menu

function offcanvasMenu() {

    if (document.querySelector('.offcanvas-switch')) {
        document.querySelector('.offcanvas-switch').addEventListener('click', function () {
            document.querySelector('header').classList.toggle('menu-open');
        });

        let navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                document.querySelector('header').classList.remove('menu-open');
            });
        });

    }

}

// add infos to thank you page
function thankYouPage() {

    if (document.querySelector('.thankyou-page')) {
        let params = new URLSearchParams(window.location.search);

        document.getElementById('firstname').innerText = params.get('firstname') || '-';
        document.getElementById('lastname').innerText = params.get('lastname') || '-';
        document.getElementById('email').innerText = params.get('email') || '-';
        document.getElementById('lieferoption').innerText = params.get('lieferoption') || '-';
        document.getElementById('strasse').innerText = params.get('strasse') || '-';
        document.getElementById('hausnummer').innerText = params.get('hausnummer') || '-';
        document.getElementById('plz').innerText = params.get('plz') || '-';
        document.getElementById('ort').innerText = params.get('ort') || '-';
        document.getElementById('artderkleidung').innerText = params.get('artderkleidung') || '-';
        document.getElementById('kriesengebiet').innerText = params.get('kriesengebiet') || '-';

        if (params.get('lieferoption') === 'Abholung') {
            document.getElementById('adresse').classList.remove('d-none');
            document.getElementById('text-abholung').classList.remove('d-none');
        } else {
            document.getElementById('text-store').classList.remove('d-none');
        }
    }

}

