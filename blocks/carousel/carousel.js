export default function decorate(block) {
  const buttons = document.createElement('div');
  buttons.className = 'carousel-buttons';
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.setAttribute('loading', 'eager'); // Preload when in viewport
        if (!i) image.setAttribute('loading', 'auto'); // Load the first image in the viewport eagerly
        observer.unobserve(image);
      }
    });
  });

  [...block.children].forEach((row, i) => {
    const classes = ['image', 'text'];
    classes.forEach((e, j) => {
      const image = row.children[j];
      image.classList.add(`carousel-${e}`);
      observer.observe(image); // Observe each image
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
