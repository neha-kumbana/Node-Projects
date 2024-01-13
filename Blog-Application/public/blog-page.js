const createBlogDOM = document.querySelector('#c0')
const viewBlogDOM = document.querySelector('#c1')

createBlogDOM.addEventListener('click', async(e) => {
    window.location.href = `create-blog.html`
})


viewBlogDOM.addEventListener('click', async(e) => {
    window.location.href = `blogs.html`
})

function hrefFunction(){
    window.location.href = 'index.html'
}
