import { USER_POSTS_PAGE } from '../routes.js'
import { renderHeaderComponent } from './header-component.js'
import { posts, goToPage } from '../index.js'
import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'

export function renderPostsPageComponent({
    appEl,
    deletePostClick,
    likePostClick,
}) {
    const render = () => {
        const appHtml = `
    <div class="page-container">
    <div class="header-container"></div>
    <ul class="posts">
        ${posts
            .map(post => {
                const toggleLikeActiveImg = post.isLiked
                    ? `like-active.svg`
                    : `like-not-active.svg`

                const togglePostLikesText = !post.likes.length
                    ? `<strong>${post.likes.length}</strong>`
                    : `<strong>${post.user.name}</strong>`

                const andStillPostLikesText = `<strong>${post.user.name}</strong> и <strong>еще ${post.likes.length - 1}</strong>`

                const postCreateFormatDate = formatDistanceToNow(
                    new Date(post.createdAt),
                    { addSuffix: true, locale: ru },
                )

                return `
        <li class="post">
            <div class="post-header" data-user-id="${post.user.id}">
                <img
                    src="${post.user.imageUrl}"
                    class="post-header__user-image"
                />
                <p class="post-header__user-name">${post.user.name}</p>
            </div>
            <div class="post-image-container">
                <img class="post-image" src="${post.imageUrl}" />
            </div>
            <div class="post-likes">
                <button class="delete-button" data-post-id="${post.id}"></button>
                <button class="like-button" data-is-liked="${post.isLiked}" data-post-id="${post.id}">
                    <img src="./assets/images/${toggleLikeActiveImg}" />
                </button>
                <p class="post-likes-text">
                Нравится: ${post.likes.length > 1 ? andStillPostLikesText : togglePostLikesText}
                </p>
            </div>
            <p class="post-text">
                <span class="user-name">${post.user.name}</span> ${post.description}
            </p>
            <p class="post-date">${postCreateFormatDate}</p>
        </li>`
            })
            .join('')}
    </ul>
    </div>`

        appEl.innerHTML = appHtml

        renderHeaderComponent({
            element: document.querySelector('.header-container'),
        })

        for (let userEl of document.querySelectorAll('.post-header')) {
            userEl.addEventListener('click', () => {
                goToPage(USER_POSTS_PAGE, {
                    userId: userEl.dataset.userId,
                })
            })
        }

        //Удалить пост
        document.querySelectorAll('.delete-button').forEach(deleteButton => {
            deleteButton.addEventListener('click', () => {
                deletePostClick({ postId: deleteButton.dataset.postId })
            })
        })

        //Поставить лайк
        document.querySelectorAll('.like-button').forEach(likeButton => {
            likeButton.addEventListener('click', () => {
                likePostClick({
                    postId: likeButton.dataset.postId,
                    isLiked: likeButton.dataset.isLiked,
                })
            })
        })
    }

    render()
}
