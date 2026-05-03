const content = document.getElementById("content");
        html += `
            <button class="category-btn"
                onclick="loadProducts('${category.shortname}')">
                ${category.name}
            </button>
        `;
    });

    html += `
        <button class="special-btn" onclick='loadSpecial(${JSON.stringify(categories)})'>
            Specials
        </button>
    `;

    html += `</div>`;

    content.innerHTML = html;

    // Виведення приміток
    categories.forEach(category => {
        if (category.notes) {
            content.innerHTML += `
                <div class="notes">
                    <strong>${category.name}:</strong> ${category.notes}
                </div>
            `;
        }
    });
}

// Випадкова категорія
function loadSpecial(categories) {
    const randomIndex = Math.floor(Math.random() * categories.length);
    const randomCategory = categories[randomIndex];

    loadProducts(randomCategory.shortname);
}

// Завантаження товарів
async function loadProducts(categoryShortName) {
    try {
        const response = await fetch(`data/${categoryShortName}.json`);
        const data = await response.json();

        displayProducts(data);
    } catch (error) {
        content.innerHTML = "<h2>Помилка завантаження товарів</h2>";
        console.error(error);
    }
}

// Відображення товарів
function displayProducts(data) {
    let html = `
        <h2>${data.categoryName}</h2>
        <div class="products">
    `;

    data.items.forEach(item => {
        html += `
            <div class="product-card">
                <img src="${item.image}" alt="${item.name}">

                <h3>${item.name}</h3>

                <p>${item.description}</p>

                <div class="price">${item.price}</div>
            </div>
        `;
    });

    html += `</div>`;

    content.innerHTML = html;
}
