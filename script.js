document.addEventListener("DOMContentLoaded", () => {

  // Function to fetch posts data
  function PromiseAPI1() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch("https://dummyjson.com/posts")
          .then((response) => response.json())
          .then((data) => {
            // Display data
            console.log(data);
            postTable(data);

            // Resolve Promise
            resolve(true);
          }).catch((err) => {
            console.error("Failed to fetch posts data", err);
            reject(err);
          });
      }, 1000);
    });
  }

  // Function to fetch products data
  function PromiseAPI2() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch("https://dummyjson.com/products")
          .then((response) => response.json())
          .then((data) => {
            // Display data
            console.log(data);
            productTable(data);
            // Resolve Promise
            resolve(true);
          }).catch((err) => {
            console.error("Failed to fetch products data", err);
            reject(err);
          });
      }, 2000);
    });
  }

  // Function to fetch todos data
  function PromiseAPI3() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch("https://dummyjson.com/todos")
          .then((response) => response.json())
          .then((data) => {
            // Display data
            console.log(data);
            todoTable(data);
            // Resolve Promise
            resolve(true);
          }).catch((err) => {
            console.error("Failed to fetch todos data", err);
            reject(err);
          });
      }, 3000);
    });
  }

  // Event listener for button click to fetch data
  document.getElementById("fetch-data-btn").addEventListener("click", () => {
    
    PromiseAPI1()
      .then((result) => {
        if (result) {
          return PromiseAPI2();
        }
      })
      .then((result) => {
        if (result) {
          return PromiseAPI3();
        }
      })
      .catch((err) => {
        console.error("Failed to fetch data", err);
      });
  });

  // Function to populate post table
  function postTable(data) {
    const table1 = document.getElementById("table-1");
    table1.innerHTML = "";
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
                <th>userID</th>
                <th>tags</th>
                <th>Reactions</th>
    `;

    thead.appendChild(headerRow);
    table1.appendChild(thead);

    const tbody1 = document.createElement("tbody");
    tbody1.classList.add("tbody-1");

    // Populate table rows with data
    data.posts.forEach((elem) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${elem.id}</td>
                <td>${elem.title}</td>
                <td>${elem.body}</td>
                <td>${elem.userId}</td>
                <td>${elem.tags.join(", ")}</td>
                <td>${elem.reactions}</td>
      `;
      tbody1.appendChild(row);
    });
    table1.appendChild(tbody1);
  }

  // Function to populate product table
  function productTable(data) {
    const maxImages = Math.max(
      ...data.products.map((product) => product.images.length)
    );

    const table2 = document.getElementById("table-2");
    table2.innerHTML = "";
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
    <th>ID</th>
    <th>Title</th>
    <th>Description</th>
    <th>Thumbnail</th>
    ${headerRowsBuilder()}
    <th>Brand</th>
    <th>Category</th>
    <th>Price</th>
    <th>Discount Percentage</th>
    <th>Rating</th>
    <th>Stock</th>
    `;

    // Helper function to build image columns
    function headerRowsBuilder() {
      let heading = "";
      for (let i = 0; i < maxImages; i++) {
        heading += `<th>Image ${i + 1}</th>`;
      }
      return heading;
    }

    thead.appendChild(headerRow);
    table2.appendChild(thead);

    const tbody2 = document.createElement("tbody");
    tbody2.classList.add("tbody-2");
    
    // Populate table rows with data
    data.products.forEach((elem) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${elem.id}</td>
                <td>${elem.title}</td>
                <td>${elem.description}</td>
                <td class="thumbnail"><img src="${
                  elem.thumbnail
                }" alt="thumbnail"></td>
                ${getImageColumns(elem.images, maxImages)}
                <td>${elem.brand}</td>
                <td>${elem.category}</td>
                <td>${elem.price}</td>
                <td>${elem.discountPercentage}</td>
                <td>${elem.rating}</td>
                <td>${elem.stock}</td>
      `;
      tbody2.appendChild(row);
    });
    table2.appendChild(tbody2);

    // Generate image columns HTML
    function getImageColumns(images, maxImages) {
      let html = "";
      for (let i = 0; i < maxImages; i++) {
        const imageSrc = images[i % images.length];
        html += `<td class="prod-img"><img src="${imageSrc}" alt="product-image"></td>`;
      }
      return html;
    }
  }

  // Function to populate todo table
  function todoTable(data) {
    const table3 = document.getElementById('table-3');
    table3.innerHTML = '';
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
              <th>ID</th>
              <th>UserID</th>
              <th>ToDo</th>
              <th>Completed</th>
    `;

    thead.appendChild(headerRow);
    table3.appendChild(thead);
    const tbody3 = document.createElement('tbody');
    tbody3.classList.add('tbody-3');

    // Populate table rows with data
    data.todos.forEach((elem) => {
      const row = document.createElement('tr');
      row.innerHTML = `
                <td>${elem.id}</td>
                <td>${elem.userId}</td>
                <td>${elem.todo}</td>
                <td>${elem.completed}</td>
      `;
      tbody3.appendChild(row);
    });
    table3.appendChild(tbody3);
  }

});
