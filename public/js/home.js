// Listen for add comment clicks
$(document).on('click', 'div.add-comment', function(event) {
    console.log($(this).attr('data-_id'));
});

// On main page load, we want to load all saved articles
if (window.location.pathname === '/') {
    $.ajax({
        url: '/api/articles',
        method: 'GET'
    }).then(articles => {
        renderArticles(articles);
        console.log(articles);
    }).catch(err => {
        alert('Error: See console!');
        console.log(err);
    });
};

function renderArticles(articles) {
    const $articles = $("div#articles");
    
    articles.forEach(article => {
        $articles.append(makeArticleMarkup(article));
    });
};

function makeArticleMarkup(article) {
    return (
    `<div class="mt-5 mb-5">
        <div>
            <div>
                <a href="${article.author.authorLink}">
                    ${article.author.authorName}
                </a>
                wrote:
            </div>
            <h2>
                ${article.title}
            </h2>
        </div>
        
        <div class="flx flx-row">
            <div class="mr-4">
                <article>
                    <span>
                        ${article.dateString}
                    </span>
                    ${article.teaser}
                </article>
            </div>
            <div class="comments-aside">
                <a href="/article?_id=${article._id}#comments">
                    ${article.comments.length ? article.comments.length + ' comments' : 'Leave a comment'}
                </a>
            </div>
        </div>
        <div>
            <a href="/article?_id=${article._id}">
                Read more...
            </a>
        </div>
    </div>`
    )
}; 