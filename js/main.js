// Change background
const arrowLeft = document.querySelector('.landing .change-background.fa-angle-left');
const arrowRight = document.querySelector('.landing .change-background.fa-angle-right');
const landing = document.querySelector('.landing');
const bullets = document.querySelectorAll('.bullets li');


let currentBgIndex = 0;

const IMAGES = ['landing01.jpg', 'landing02.jpg', 'landing03.jpg'];

randomBackground();

function randomBackground() {
    setInterval(
        () => {
            setBackground(currentBgIndex);
            currentBgIndex++;
            if (currentBgIndex % IMAGES.length == 0)
                currentBgIndex = 0;
        },
        10000
    );
}

// landing bullets

bullets.forEach((bullet, index) => {
    bullet.addEventListener('click', (e) => {
        handleActiveClass(e);
        landing.style.backgroundImage = `url('./images/${IMAGES[index]}')`;
        currentBgIndex = index;
    });
});

// left and right arrows

arrowLeft.addEventListener('click', (e) => {
    currentBgIndex--;
    if (currentBgIndex < 0)
        currentBgIndex = IMAGES.length - 1; // Last index in the array
    setBackground(currentBgIndex);
});

arrowRight.addEventListener('click', (e) => {
    currentBgIndex++;
    if (currentBgIndex % IMAGES.length === 0)
        currentBgIndex = 0;
    setBackground(currentBgIndex);
});

function setBackground(index) {
    landing.style.backgroundImage = `url('./images/${IMAGES[index]}')`;
    bullets.forEach(bullet => {
        bullet.classList.remove('active');
    });
    bullets[index].classList.add('active');
}

// Search bar

document.querySelector('header .form i').onclick = function() {
    document.querySelector('header').classList.toggle('open');
    if (document.querySelector('header').classList.contains('open'))
        document.querySelector('header.open .search').focus();
};


// toggle menu

document.querySelector('.toggle-menu').addEventListener('click', function() {
    this.classList.toggle('show');
});

document.querySelector('.toggle-menu+ul').addEventListener('click', (e) => e.stopPropagation());

window.onclick = function(e) {
    console.log(e.target);
    if (!e.target.classList.contains('toggle-menu') && document.querySelector('.toggle-menu').classList.contains('show')) {
        document.querySelector('.toggle-menu').classList.remove('show');
    }
};

// Our Skills 

const skillsDiv = document.querySelector('.our-skills .skills');

let observerObj = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        let progs = document.querySelectorAll('.prog span');
        if (entry.isIntersecting) {
            progs.forEach(prog => {
                prog.style.width = prog.dataset.progress;
            });
            return;
        }
        progs.forEach(prog => {
            prog.style.width = '0';
        });

    });
});
observerObj.observe(skillsDiv);


// Globale functions

function handleActiveClass(event) {
    event.target.parentElement.querySelectorAll('.active').forEach(
        element => {
            element.classList.remove('active');
        }
    );
    event.target.classList.add('active');
}