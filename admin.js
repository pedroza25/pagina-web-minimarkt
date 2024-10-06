document.addEventListener("DOMContentLoaded", () => {
  const productoForm = document.getElementById("productoForm");
  const productosDiv = document.getElementById("productos");

  // Cargar productos existentes
  fetch("/api/productos")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((producto) => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
          <h3>${producto.name}</h3>
          <p>${producto.description}</p>
          <p>Precio: $${producto.price}</p>
          <p>Stock: ${producto.stock}</p>
          <button data-id="${producto.id}" class="delete-btn">Eliminar</button>
        `;
        productosDiv.appendChild(productItem);
      });
    })
    .catch((err) => console.error("Error:", err));

  // Añadir producto nuevo
  productoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;

    fetch("/api/productos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, stock }),
    })
      .then((response) => response.text())
      .then((data) => alert(data))
      .catch((err) => console.error("Error:", err));
  });

  // Eliminar producto
  productosDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const id = e.target.getAttribute("data-id");

      fetch(`/api/productos/delete/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.text())
        .then((data) => {
          alert(data);
          location.reload();
        })
        .catch((err) => console.error("Error:", err));
    }
  });
});
