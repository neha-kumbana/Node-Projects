const publicBlogsDOM = document.querySelector('.blogs')
const searchBlogsDOM = document.querySelector('.searchTerm')
const searchBlogBtnDOM = document.querySelector('.searchButton')
const likeCountDOM = document.querySelector('.likeCount')

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

let isLiked = false;
let likeCount = 0

window.addEventListener('load', async (e) => {
    try {
        const {
            data: { publicBlogs }
        } = await axios.get('api/v1/blog/public/blogs', {
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        const allPromiseBlogs = publicBlogs.map(async (blog) => {
            const { title, category, visibility, content, _id: blogId, createdAt, author, updatedAt } = blog
            const createdAtFromMongo = new Date(createdAt);
            const options = { timeZone: "Asia/Kolkata", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" };
            const createdAtIST = createdAtFromMongo.toLocaleString("en-IN", options);
            const updatedAtFromMongo = new Date(updatedAt);
            const updatedAtIST = updatedAtFromMongo.toLocaleString("en-IN", options);
            try {
                const authorResponse = await axios.get(`/api/v1/blog/public/author/${blogId}`)
                const authorName = authorResponse.data
                const likeResponse = await axios.get(`/api/v1/blog/public/comments/${blogId}`)
                const likes = likeResponse.data.totalLikes
                return `<div class="blog-container">
                        <div class="blog-card">
                        <div class="blog-detail">
                            <center><h3><span class="title">${title}</span></h3></center>
                            <span class="detail">${content}</span>
                            </br>
                            </br>
                            <div class="interaction-session">
                            <div class="like-session">
                                <button class="like-button" onclick="handleLike('${blogId}','${likes}')">
                                    <i class="fas fa-thumbs-up"></i>
                                    <span class="likeCount" id="likeCount-${blogId}">${likes}</span>
                                </button>
                            </div>
                            <div class="comment-section">
                                <div class="comment-container">
                                    <button class="comment-button" onclick="toggleCommentBox('${blogId}')">
                                        <i class="fas fa-comment"></i>
                                    </button>
                                    <div class="comment-box" id="commentBox-${blogId}">
                                        <textarea placeholder="Type your comment here..." id="commentInput-${blogId}"></textarea>
                                        <button onclick="postComment('${blogId}')">Post</button>
                                    </div>
                                </div>
                            </div>
                            </div>
                            </br>
                            <span class="created">Posted by: ${authorName}</span>
                            </br>
                            <span class="created">Created at: ${createdAtIST}</span>
                            </br>
                            <span class="created">Updated at: ${updatedAtIST}</span>
                            </br>
                        </div>
                        </div>
                    </div>`
            } catch (error) {
                console.log('An error occurred', error);
            }
        });

        const allBlog = await Promise.all(allPromiseBlogs);
        const publicBlogDOM = document.getElementById('view-blogs');
        publicBlogDOM.innerHTML = `<div class="blog-container">${allBlog.join('')}</div>`;

    } catch (error) {
        console.log('An error occurred', error);
    }
});

searchBlogBtnDOM.addEventListener('click', async(e) => {
    const searchBlog = searchBlogsDOM.value 
    try{
        const {
            data: { publicBlogs }
        } = await axios.get(`api/v1/blog/public/category/${searchBlog}`)
        const allPromiseBlogs = publicBlogs.map(async(blog) => {
            const { _id:blogId, content, category, visibility, title, createdAt, updatedAt } = blog
            const createdAtFromMongo = new Date(createdAt);
            const options = { timeZone: "Asia/Kolkata", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" };
            const createdAtIST = createdAtFromMongo.toLocaleString("en-IN", options);
            const updatedAtFromMongo = new Date(updatedAt);
            const updatedAtIST = updatedAtFromMongo.toLocaleString("en-IN", options);
            try{
                const authorResponse = await axios.get(`/api/v1/blog/public/author/${blogId}`)
                const authorName = authorResponse.data
                const likeResponse = await axios.get(`/api/v1/blog/public/comments/${blogId}`)
                const likes = likeResponse.data.totalLikes
                return `<div class="blog-container">
                        <div class="blog-card">
                        <div class="blog-detail">
                            <center><h3><span class="title">${title}</span></h3></center>
                            <h4><span class="category">${category}</span></h4>
                            <span class="detail">${content}</span>
                            </br>
                            </br>
                            <div class="interaction-session">
                            <div class="like-session">
                                <button class="like-button" onclick="handleLike('${blogId}','${likes}')">
                                    <i class="fas fa-thumbs-up"></i>
                                    <span class="likeCount" id="likeCount-${blogId}">${likes}</span>
                                </button>
                            </div>
                            <div class="comment-section">
                                <div class="comment-container">
                                    <button class="comment-button" onclick="toggleCommentBox('${blogId}')">
                                        <i class="fas fa-comment"></i>
                                    </button>
                                    <div class="comment-box" id="commentBox-${blogId}">
                                        <textarea placeholder="Type your comment here..." id="commentInput-${blogId}"></textarea>
                                        <button onclick="postComment('${blogId}')">Post</button>
                                    </div>
                                </div>
                            </div>
                            </div>
                            </br>
                            <span class="created">Posted by: ${authorName}</span>
                            </br>
                            <span class="created">Created at: ${createdAtIST}</span>
                            </br>
                            <span class="created">Updated at: ${updatedAtIST}</span>
                            </br>
                        </div>
                        </div>
                    </div>`
            }catch(error){
                console.log('An error occured', error);
            }
        })
        const allBlogs = await Promise.all(allPromiseBlogs)
        const publicBlogDOM = document.getElementById('view-blogs');
        publicBlogDOM.innerHTML = `<div class="blog-container">${allBlogs.join('')}</div>`;
    }catch(error){
        console.log('An error occured', error);
    }
})


async function handleLike(blogId, likes) {
    console.log(likes);
    let likeCount = parseInt(likes); // Parse likes as an integer
    const likeCountElement = document.querySelector(`#likeCount-${blogId}`);

    if (likeCount > 0) {
        likeCount--;

    } else {
        likeCount++;
    }

    // Toggle the like state
    isLiked = likeCount > 0;

    likeCountElement.textContent = likeCount;

    try {
        const token = localStorage.getItem('token')
        const likeCount = likeCountElement.textContent
        const formData = new URLSearchParams;
        formData.append('like', likeCount)
        formData.append('blogId', blogId)
        const response = await axios.post('/api/v1/blogs/comments', formData.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${token}`
            }
        })
        const { data } = response
        console.log(data);
        location.reload();

    } catch (error) {
        console.log('An error occurred', error);
    }
}

function updateLikeCount() {
    const likeCountElement = document.getElementById('likeCount');
    location.reload();
    likeCountElement.textContent = likeCount;
    
}

function toggleCommentBox(blogId) {
    const commentBox = document.getElementById(`commentBox-${blogId}`);
    commentBox.style.display = commentBox.style.display === 'block' ? 'none' : 'block';
  }
  
  async function postComment(blogId) {
    const commentInput = document.getElementById(`commentInput-${blogId}`);
    const comment = commentInput.value.trim();
  
    if (comment !== '') {
        try{
            const token = localStorage.getItem('token')
            const commentDOM = commentInput.value
            const formData = new URLSearchParams;
            formData.append('comment',commentDOM)
            formData.append('blogId', blogId) 
            const response = await axios.post('/api/v1/blogs/comments', formData.toString(),{
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`
                }
            })
            const { data } = response
            console.log(data);
        }catch{
            console.log('An error occured', error);
        }

      console.log('Posted comment:', comment);
      // Clear the comment input
      commentInput.value = '';
      // Hide the comment box after posting
      toggleCommentBox(blogId);
    }
  }
  