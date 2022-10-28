//select all images wih data-src
const imagesToLoad = document.querySelectorAll("img[data-src]");

//parameter for Intersectional for when to start loading
const imgOptions = {
    rootMargin:  '0px 0px 50px 0px',
    threshold: 1 //.5
};

const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
            image.removeAttribute('data-src');
    };
};

if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((items, imgObserver) => {
        items.forEach(item => {
                if (item.isIntersecting) {
                    loadImages(item.target);
                    imgObserver.unobserve(item.target);
                }
        });
    }, imgOptions);


imagesToLoad.forEach(img => {
    imgObserver.observe(img);
});
} else {// just load All images if not supported
    imagesToLoad.forEach(img => {
        loadImages(img);
    });
}
