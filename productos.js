document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/productos")
    .then((response) => response.json())
    .then((data) => {
      const productosDiv = document.getElementById("productos");
      data.forEach((producto) => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
          <h3>${producto.name}</h3>
          <p>${producto.description}</p>
          <p>Precio: $${producto.price}</p>
          <p>Stock: ${producto.stock}</p>
        `;
        productosDiv.appendChild(productItem);
      });
    })
    .catch((err) => console.error("Error:", err));
});
