const formDOM = document.querySelector('.form')
const blogDOM = document.querySelector('.blogs')
const titleDOM = document.querySelector('.title-Input')
const categoryDOM = document.querySelector('.category-Input')
const visibilityDOM = document.querySelector('input[name="visibility"]:checked').value
const contentDOM = document.querySelector('.content-Input')
const formAlertDOM = document.querySelector('.form-alert')
// const form = document.getElementById('blogForm');
// const imageInput = document.getElementById('imageInput');
 
 // Update the span with the username
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


formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()

    // const formData = new FormData(form);
    // formData.append('image', imageInput.files[0]);
    // formData.append('title', 'Your Title'); // Replace 'Your Title' with the actual title value
    // formData.append('content', 'Your Content');
    // const title = titleDOM.value
    // const category = categoryDOM.value
    // const image = imageInput.value
    // const visibilityDOM = document.querySelector('input[name="visibility"]:checked');
    // const formData = new FormData(formDOM)
    // if (!visibilityDOM) {
    //     // Handle case when no radio button is checked
    //     console.error('No visibility selected');
    //     return;
    // }
    
    const token = getJwtToken()

    if(token){
        try{
            const token = localStorage.getItem('token')
            const title = titleDOM.value;
            console.log(title);
            const category = categoryDOM.value;
            const visibility = document.querySelector('input[name="visibility"]:checked').value;
            const content = contentDOM.value;
            const formData = new URLSearchParams();
            formData.append('title',title)
            formData.append('category',category)
            formData.append('visibility',visibility)
            formData.append('content',content)
            const response = await axios.post('/api/v1/blogs', formData.toString() ,{
                headers :{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`
                } 
            })
            const { data } = response
            console.log(response);
            console.log('API response',data.blog.visibility);
            titleDOM.value = '';
            categoryDOM.value = '';
            visibilityDOM.value = '';
            contentDOM.value = '';

            // Reload the page
            //window.location.reload();
            alert("Your blog has been published...")
            window.location.href = `blogs.html`
        }catch(error){
            console.error('An error occured', error);
            formAlertDOM.style.display = 'block';
            formAlertDOM.textContent = 'An error occurred. Please try again.';
        }
    }
    
})

// window.addEventListener('load', async(e) => {
//     const token = getJwtToken()
//     try{
//         const {
//             data: { blogs },
//           } = await axios.get('/api/v1/blogs', {
//             headers:{
//                 'Content-Type': 'multipart/form-data',
//                 Authorization: `Bearer ${token}`,
//             }
//         })
//         const allBlogs = blogs
//         .map((blog) => {
//         const { title, category, visibility, content, _id:blogId } = blog
//         return `<div class="blog-container">
//         <div class="blog-card">
//         <div class="blog-detail">
//             <center><h1><span class="title">${title}</span></h1></center>
//             <span class="detail">${content}</span>
//             </br>
//             <a href="edit-blog.html?id=${blogId}" class="edit-link">
//             <i class="fas fa-edit"></i>
//             </a>
//             <!-- delete btn -->
//             <button class="delete-btn" data-id="${blogId}">
//             <i class="fas fa-trash" aria-hidden="true"></i>
//             </button>
//         </div>
//         </div>
//     </div>`

// })
// .join('');
//         const blogDOM = document.getElementById('view-blogs'); // Replace 'blogs-list' with your actual element ID
//         blogDOM.innerHTML = `<div class="blog-container">${allBlogs}</div>`;

//     }catch(error){
//         console.error('Something went wrong', error);
//     }
// })


// blogDOM.addEventListener('click',async (e) => {
//     const el = e.target
//     if (el.parentElement.classList.contains('delete-btn')) {
//         const id = el.parentElement.dataset.id
//         try {
//             const token = getJwtToken()
//             await axios.delete(`/api/v1/blogs/${id}`,{
//                 headers:{
//                     Authorization:`Bearer ${token}`
//                 }
//             })
//             window.location.reload()
//         } catch (error) {
//         console.log(error)
//         }
//     }
// })

