const createBlogDOM = document.querySelector('#c0')
const viewBlogDOM = document.querySelector('#c1')
const viewPublicBlogDOM = document.querySelector('#c2')
const viewProfileDOM = document.querySelector('.view-profile')

createBlogDOM.addEventListener('click', async(e) => {
    window.location.href = `create-blog.html`
})

viewBlogDOM.addEventListener('click', async(e) => {
    window.location.href = `blogs.html`
})

viewPublicBlogDOM.addEventListener('click', async(e) => {
    window.location.href = `public-blogs.html`
})

viewProfileDOM.addEventListener('click', async(e) => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    if(!token){
        alert('Create an account to view your profile')
    }else{
        try{
            const response = await axios.get(`api/v1/auth/users/${username}`,{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded',
                    Authorization:`Bearer ${token}`
                }
            })
            const { data } = response
            console.log(data.user._id);

        }catch(error){
            console.log('An error occured', error);
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
