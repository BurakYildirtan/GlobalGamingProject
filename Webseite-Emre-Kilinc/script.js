let progress = document.getElementById('progressbar');
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function() {
    let progressHeight = (window.pageYOffset / totalHeight) * 100;
    progress.style.height = progressHeight + "%";
}

let count = 0;

const counter = document.getElementById('counter');
document.getElementById('add-animation').addEventListener('click', event => {
    const cl = counter.classList;
    const c = 'animated-counter';
    count++;


    counter.innerText = count;
    cl.remove(c, cl.contains(c));
    setTimeout(() =>
        counter.classList.add('animated-counter'), 1)
})

document.getElementById('buy-now').addEventListener('click', event => {
    const cl = counter.classList;
    const c = 'animated-counter';
    count++;


    counter.innerText = count;
    cl.remove(c, cl.contains(c));
    setTimeout(() =>
        counter.classList.add('animated-counter'), 1)
})

$(document).ready(function() {
    $(".navbar").hover(function() {
        $(".navbar").toggleClass("expandAnimation");
    });

});