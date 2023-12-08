import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
const proxyUrl = 'https://api.allorigins.win/raw?url=';
const apiUrl = 'https://main--idfcfirstbank--teknopointproject.hlx.live/data.json';




fetch(proxyUrl + encodeURIComponent(apiUrl))
  .then(response => response.json())
  .then(data => {
    var div = document.createElement('div');
    div.classList.add("apidata");

    if (data && data.data && Array.isArray(data.data)) {
      data.data.forEach(item => {
        var itemDiv = document.createElement('div');

        // Loop through each property of the object
        for (const key in item) {
          if (item.hasOwnProperty(key)) {
            var propertyDiv = document.createElement('div');

            var sourceSpan = document.createElement('span');
            sourceSpan.textContent = key + ": ";

            var destinationSpan = document.createElement('span');
            destinationSpan.textContent = item[key];

            propertyDiv.appendChild(sourceSpan);
            propertyDiv.appendChild(destinationSpan);

            itemDiv.appendChild(propertyDiv);
          }
        }

        div.appendChild(itemDiv);
      });

      var body = document.body;
      body.appendChild(div);
    } else {
      console.error('Error: Data.data is not in the expected format');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });


