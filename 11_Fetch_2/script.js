let q = "it";
let page = 1;

async function fetchNews() {
    const apiKey = "eef038525fa7401d8dfe7cf1a9006b10";
    const language = "uk";

    const url = `https://newsapi.org/v2/everything?language=${language}&q=${q}&pageSize=20&page=${page}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-Api-Key": apiKey,
            },
        });
        if (!response.ok) {
            setPagination(0);
            return [];
        }
        const data = await response.json();
        setPagination(data.totalResults);
        return data.articles;
    } catch (error) {
        console.error(error);
        setPagination(0);
        return [];
    }
}

async function searchHandler(e) {
    if (e.key == "Enter") {
        const search = document.getElementById("newsSearch").value.trim();
        if (search.length > 0) {
            q = search;
            const news = await fetchNews();
            updateNews(news);
        }
    }
}

function updateNews(news) {
    const container = document.getElementById("newsContainer");
    container.innerHTML = "";
    for (const article of news) {
        container.innerHTML += getArticleCard(article);
    }
}

function getArticleCard(article) {
    const imgUrl = article.urlToImage
        ? article.urlToImage
        : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg";

    return `<div class="col-3 mt-2">
                    <div class="card h-100" style="width: 18rem">
                        <img src="${imgUrl}" class="card-img-top" alt="${article.source.name}" />
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">
                                ${article.description}
                            </p>
                            <a href="${article.url}" class="btn btn-primary">Go to source</a>
                        </div>
                    </div>
                </div>`;
}

async function showNews() {
    const news = await fetchNews();

    if (news.length > 0) {
        updateNews(news);
    } else {
        container.innerHTML = "<h1>News not found</h1>";
    }
}

// pagination
// ----------->
function setPagination(totalSize, pageSize = 20) {
    const container = document.getElementById("pagination");
    container.innerHTML = getPagination(totalSize, pageSize);
}

async function paginationHandler(currentPage) {
    page = currentPage;
    const news = await fetchNews();
    updateNews(news);
}

function getPagination(totalSize, pageSize = 20) {
    if (totalSize == 0) {
        return "";
    }

    let pagesHtml = "";
    let pages = Math.ceil(totalSize / pageSize);

    for(let i = 1; i <= pages; i++) {
        pagesHtml += `<li class="page-item ${i === page ? "active" : ""}" onclick="paginationHandler(${i})">
                        <a class="page-link">${i}</a>
                    </li>`;
    }

    const prevPage = page > 1 ? `onclick="paginationHandler(${page - 1})"` : "";
    const nextPage = page < pages ? `onclick="paginationHandler(${page + 1})"` : "";

    return `        
                    <li class="page-item ${page == 1 ? 'disabled' : ''}" ${prevPage}>
                        <a class="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    ${pagesHtml}
                    <li class="page-item ${page == pages ? 'disabled' : ''}" ${nextPage}>
                        <a class="page-link" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>`;
}
// <-----------

showNews();
