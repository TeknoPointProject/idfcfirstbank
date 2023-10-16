export default function decorate(block) {
  const buttons = document.createElement('div');
  buttons.className = 'carousel-buttons';
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const image = entry.target.querySelector('img');
        image.loading = 'auto'; // Load the image immediately
        buttons.children[i].classList.add('selected');
        observer.unobserve(entry.target);
      }
    });
  });

  [...block.children].forEach((row, i) => {
    const classes = ['image', 'text'];
    classes.forEach((e, j) => {
      row.children[j].classList.add(`carousel-${e}`);
    });
    /* buttons */
    const button = document.createElement('button');
    button.title = 'Carousel Nav';
    if (!i) {
      button.classList.add('selected');
      // Load the image immediately if it's in the first fold
      row.querySelector('img').loading = 'auto';
    } else {
      observer.observe(row);
    }
    button.addEventListener('click', () => {
      block.scrollTo({ top: 0, left: row.offsetLeft - row.parentNode.offsetLeft, behavior: 'smooth' });
      [...buttons.children].forEach((r) => r.classList.remove('selected'));
      button.classList.add('selected');
    });
    buttons.append(button);
  });
  block.parentElement.append(buttons);
}
