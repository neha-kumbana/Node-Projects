const viewBlogDOM = document.querySelector('#c1')
const blogDOM = document.querySelector('.blogs')
const viewProfileDOM = document.querySelector('.view-profile')

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
    window.location.href = 'login.html'
    localStorage.removeItem('token')
    localStorage.removeItem('username')
}

//create a blog

function getJwtToken(){
    return localStorage.getItem('token')
}


let isLiked = false;
let likeCount = 0;
window.addEventListener('load', async (e) => {
    const token = getJwtToken();

    try {
        const {
            data: { blogs },
        } = await axios.get('api/v1/blogs', {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${token}`,
            },
        });

        const allPromiseBlogs = blogs.map(async (blog) => {
            const { title, content, _id: blogId } = blog;

            try {
                const likeResponse = await axios.get(`/api/v1/blog/public/comments/${blogId}`);
                const likes = likeResponse.data.totalLikes;
                const comments = likeResponse.data.comments;

                const commentDetails = await Promise.all(comments.map(async (comment) => {
                    if (comment.comment !== undefined) {
                        const authorNameResponse = await axios.get(`/api/v1/blog/public/comment/${comment._id}`);
                        const authorName = authorNameResponse.data;
                        return {
                            commentText: comment.comment,
                            authorName: authorName,
                        };
                    }
                    return null;
                }));

                return `<div class="blog-container">
                    <div class="blog-card">
                        <div class="blog-detail">
                            <center><h1><span class="title">${title}</span></h1></center>
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
                                <div class="comment-session">
                                    <div class="comments" id="comments-${blogId}">
                                        ${commentDetails
                                            .filter(commentDetail => commentDetail !== null)
                                            .map(commentDetail => `<div>${commentDetail.commentText}<span class="post"> Posted by- ${commentDetail.authorName}</span></div>`).join('')}
                                    </div>
                                </div>
                                <a href="edit-blog.html?id=${blogId}" class="edit-link">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <!-- delete btn -->
                                <button class="delete-btn" data-id="${blogId}">
                                    <i class="fas fa-trash" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
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

viewProfileDOM.addEventListener('click', async(e) => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    try{
        const response = await axios.get(`api/v1/auth/users/${username}`,{
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                Authorization:`Bearer ${token}`
            }
        })
        const { data } = response
        const userId = (data.user._id);
        window.location.href = `view-profile.html?id=${userId}`
  
    }catch(error){
        console.log('An error occured', error);
    }
  })


  async function handleLike(blogId, likes) {
    console.log(likes);
    let likeCount = parseInt(likes) || 0; // Parse likes as an integer
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
