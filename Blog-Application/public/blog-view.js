const viewBlogDOM = document.querySelector('#c1')
const blogDOM = document.querySelector('.blogs')

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

function hrefFunction(){
    window.location.href = 'index.html'
}

//create a blog

function getJwtToken(){
    return localStorage.getItem('token')
}

window.addEventListener('load', async(e) => {
    const token = getJwtToken()
    console.log(token);
    try{
        const {
            data : {blogs},
        } = await axios.get('api/v1/blogs',{
            headers:{
                'Content-type':'application/x-www-form-urlencoded',
                Authorization: `Bearer ${token}`
            }
        })
        const allBlogs = blogs
        .map((blog) => {
            const {title, category, visibility, content, _id:blogId} = blog
            return `<div class="blog-container">
                    <div class="blog-card">
                    <div class="blog-detail">
                        <center><h1><span class="title">${title}</span></h1></center>
                        <span class="detail">${content}</span>
                        </br>
                        <a href="edit-blog.html?id=${blogId}" class="edit-link">
                        <i class="fas fa-edit"></i>
                        </a>
                        <!-- delete btn -->
                        <button class="delete-btn" data-id="${blogId}">
                        <i class="fas fa-trash" aria-hidden="true"></i>
                        </button>
                    </div>
                    </div>
                </div>`
        })
        .join('');
        const blogDOM = document.getElementById('view-blogs'); 
                blogDOM.innerHTML = `<div class="blog-container">${allBlogs}</div>`;
    }catch(error){
        console.log('Something went wrong', error);
    }
})

blogDOM.addEventListener('click',async (e) => {
    const el = e.target
    if (el.parentElement.classList.contains('delete-btn')) {
        const id = el.parentElement.dataset.id
        try {
            const token = getJwtToken()
            await axios.delete(`/api/v1/blogs/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            window.location.reload()
        } catch (error) {
        console.log(error)
        }
    }
})