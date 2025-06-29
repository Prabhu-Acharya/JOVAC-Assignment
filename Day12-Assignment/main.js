
let allProducts = [];
let visibleCount = 5;

const productContainer = document.getElementById("products");
const loadMoreBtn = document.getElementById("loadMore");
const searchInput = document.getElementById("search");
const noResults = document.getElementById("noResults");

// Fetch data from API
fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    renderProducts();
  });

// Render products based on visibleCount and search
function renderProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = allProducts.slice(0, visibleCount).filter(p =>
    p.title.toLowerCase().includes(searchTerm)
  );

  productContainer.innerHTML = "";
  if (filtered.length === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
    filtered.forEach(product => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${product.image}" />
        <h3>${product.title}</h3>
        <p>₹${product.price}</p>
      `;
      div.addEventListener("click", () => {
        window.location.href = `product.html?id=${product.id}`;
      });
      productContainer.appendChild(div);
    });
  }

  if (visibleCount >= allProducts.length) {
    loadMoreBtn.style.display = "none";
  }
}

loadMoreBtn.addEventListener("click", () => {
  visibleCount += 5;
  renderProducts();
});

searchInput.addEventListener("input", () => {
  renderProducts();
});