const publicBlogsDOM = document.querySelector('.blogs')
const searchBlogsDOM = document.querySelector('.searchTerm')
const searchBlogBtnDOM = document.querySelector('.searchButton')


function updateUsernameSpan() {
    const username = localStorage.getItem('username')
    const usernameSpan = document.getElementById('username');
    if (username && usernameSpan) {
      usernameSpan.textContent = username;
    } else {
      usernameSpan.textContent = 'Guest'; 
    }
}
updateUsernameSpan();

function hrefFunction() {
    window.location.href = `login.html`
    localStorage.removeItem('token')
    localStorage.removeItem('username')
}


window.addEventListener('load', async(e) => {
    try{
        const {
            data:{publicBlogs}
        } = await axios.get('api/v1/blog/public/blogs',{
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        const allBlogs = publicBlogs
        .map((blog) => {
            const {title, category, visibility, content, _id:blogId} = blog
            return `<div class="blog-container">
                    <div class="blog-card">
                    <div class="blog-detail">
                        <center><h3><span class="title">${title}</span></h3></center>
                        <span class="detail">${content}</span>
                        </br>
                    </div>
                    </div>
                </div>`
        })
        .join('');
        const blogDOM = document.getElementById('view-blogs'); 
                blogDOM.innerHTML = `<div class="blog-container">${allBlogs}</div>`;
        
    }catch(error){
        console.log('An error occured', error);
    }
})

searchBlogBtnDOM.addEventListener('click', async(e) => {
    const searchBlog = searchBlogsDOM.value 
    try{
        const {
            data: { publicBlogs }
        } = await axios.get(`api/v1/blog/public/category/${searchBlog}`)
        const allBlogs = publicBlogs
        .map((blog) => {
            const { _id:blogId, title, category, visibility, content } = blog
            return `<div class="blog-container">
                    <div class="blog-card">
                    <div class="blog-detail">
                        <center><h3><span class="title">${title}</span></h3></center>
                        <h4><span class="category">${category}</span></h4>
                        <span class="detail">${content}</span>
                        </br>
                    </div>
                    </div>
                </div>`
        })
        .join('')
        const publicBlogDOM = document.getElementById('view-blogs') 
        publicBlogsDOM.innerHTML = `<div class="blog-container">${allBlogs}</div>`
    }catch(error){
        console.log('An error occured', error);
    }
})