const blogIDDOM = document.querySelector('.blogId')
const blogTitleDOM = document.querySelector('.title-Input')
const blogCategoryDOM = document.querySelector('.category-Input')
const blogVisibilityDOM = document.querySelectorAll('.visibility-Input')
const blogContentDOM = document.querySelector('.content-Input')
const viewProfileDOM = document.querySelector('.view-profile')
const formDOM = document.querySelector('.form')
const editBtnDOM = document.querySelector('.edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')


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

function getJwtToken(){
    return localStorage.getItem('token')
}

const token = getJwtToken()

const showBlog = async () => {
    try{
        const {
            data : { blog },
        } = await axios.get(`/api/v1/blogs/${id}`,{ headers :{
            Authorization: `Bearer ${token}`
        }} )
        const { _id:blogId, title, category, visibility, content } = blog
        blogIDDOM.textContent = blogId

        blogTitleDOM.value = title
        blogCategoryDOM.value = category
        blogContentDOM.value = content
        blogVisibilityDOM.forEach((radio) => {
            if (radio.value === visibility) {
                radio.checked = true;
            }
        })
        

    }catch(error){
        console.log(error);
    }
}

showBlog()

formDOM.addEventListener('submit', async(e) => {
    e.preventDefault()

    if(token){
        try{
            const token = localStorage.getItem('token')
            const title = blogTitleDOM.value;
            const category = blogCategoryDOM.value;
            const visibility = document.querySelector('input[name="visibility"]:checked').value;
            const content = blogContentDOM.value;
            const formData = new FormData(formDOM)
            formData.append('title',title)
            formData.append('category',category)
            formData.append('visibility',visibility)
            formData.append('content',content)
            const response = await axios.patch(`/api/v1/blogs/${id}`, {title,category,visibility,content}, {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response);
            const { data } = response;
            console.log(data);
            window.location.href=`blogs.html`
        }catch(error){
            console.error(error);
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