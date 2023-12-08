fetch(proxyUrl + encodeURIComponent(apiUrl))
  .then(response => response.json())
  .then(data => {
    var div = document.createElement('div');
    div.classList.add("apidata");

    // Check if data is an array
    if (Array.isArray(data)) {
      data.forEach(item => {
        var itemDiv = document.createElement('div');

        var sourceSpan = document.createElement('span');
        sourceSpan.textContent = item.Source + ": ";

        var destinationSpan = document.createElement('span');
        destinationSpan.textContent = item.Destination;

        itemDiv.appendChild(sourceSpan);
        itemDiv.appendChild(destinationSpan);

        div.appendChild(itemDiv);
      });

      var body = document.body;
      body.appendChild(div);
    } else {
      console.error('Error: Data is not an array');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
