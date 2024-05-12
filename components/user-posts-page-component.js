import { renderHeaderComponent } from './header-component.js'
import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'

export function renderUserPostsPageComponent({ appEl, posts }) {
    const appHtml = `
    <div class="page-container">
    <div class="header-container"></div>
    <ul class="user-posts">
        ${posts
            .map(post => {
                const activeLike = post.isLiked
                    ? `like-active.svg`
                    : `like-not-active.svg`

                const postCreateDate = formatDistanceToNow(
                    new Date(post.createdAt),
                    { addSuffix: true, locale: ru },
                )

                return `
        <div class="posts-user-header" data-user-id="${post.user.id}">
            <img
                src="${post.user.imageUrl}"
                class="posts-user-header__user-image"
            />
            <p class="posts-user-header__user-name">${post.user.name}</p>
        </div>
        <li class="post">
            <div class="post-image-container">
                <img class="post-image" src="${post.imageUrl}" />
            </div>
            <div class="post-likes">
                <button data-post-id="${post.id}" class="like-button">
                    <img src="./assets/images/${activeLike}" />
                </button>
                <p class="post-likes-text">
                    Нравится: <strong>${post.likes.length}</strong>
                </p>
            </div>
            <p class="post-text">
                <span class="user-name">${post.user.name}</span>
                ${post.description}
            </p>
            <p class="post-date">${postCreateDate}</p>
        </li>`
            })
            .join('')}
    </ul>
    </div>`

    appEl.innerHTML = appHtml

    renderHeaderComponent({
        element: document.querySelector('.header-container'),
    })
}
