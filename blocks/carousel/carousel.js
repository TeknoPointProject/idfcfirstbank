export default function decorate(block) {
  const buttons = document.createElement('div');
  buttons.className = 'carousel-buttons';
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.setAttribute('loading', 'eager'); // Preload when in viewport
        observer.unobserve(image);
      }
    });
  });

  let firstImageInFold = true;

  [...block.children].forEach((row, i) => {
    const classes = ['image', 'text'];
    classes.forEach((e, j) => {
      const image = row.children[j];
      image.classList.add(`carousel-${e}`);
      observer.observe(image); // Observe each image

      if (firstImageInFold && isImageInFirstFold(image)) {
        image.setAttribute('loading', 'auto'); // Load the first image in the fold eagerly
        firstImageInFold = false;
      }
    });

    /* buttons */
    const button = document.createElement('button');
    button.title = 'Carousel Nav';
    if (!i) button.classList.add('selected');
    button.addEventListener('click', () => {
      block.scrollTo({ top: 0, left: row.offsetLeft - row.parentNode.offsetLeft, behavior: 'smooth' });
      [...buttons.children].forEach((r) => r.classList.remove('selected'));
      button.classList.add('selected');
    });
    buttons.append(button);
  });

  block.parentElement.append(buttons);
}

function isImageInFirstFold(image) {
  // Check if an image is in the first fold by comparing its offsetTop with the window's innerHeight
  return image.offsetTop < window.innerHeight;
}
