const usernameDOM = document.querySelector('#usernames')
const emailDOM = document.querySelector('.email')
const fullNameDOM = document.querySelector('.fullName')
const socialMediaLinksDOM = document.querySelector('.socialMediaLinks')
const bioDOM = document.querySelector('.bio')
const editBtnDOM = document.querySelector('.edit-btn')
const formDOM = document.querySelector('.form')
const viewProfileDOM = document.querySelector('.view-profile')
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

const showUser = async () => {
  
  try{
    const {
      data : { user }
    } = await axios.get(`api/v1/auth/user/${id}`, {
      headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`
      }
    })
    const { _id:userId, username, email, fullName, socialMediaLinks, bio } = user
    
    usernameDOM.textContent = username
    emailDOM.textContent = email
    fullNameDOM.value = fullName
    socialMediaLinksDOM.value = socialMediaLinks
    bioDOM.value = bio

  }catch(error){
    console.log('An error occured', error);
  }
}

showUser()

formDOM.addEventListener('submit', async(e) => {
  e.preventDefault()
  if(token){
    try{
      const token = localStorage.getItem('token')
      const fullName = fullNameDOM.value
      const socialMeadiaLinks = socialMediaLinksDOM.value
      const bio = bioDOM.value
      const formData = new URLSearchParams();
      formData.append('fullName',fullName)
      formData.append('socialMediaLinks',socialMeadiaLinks)
      formData.append('bio',bio)
      
    const response = await axios.patch(`/api/v1/auth/user/${id}`,formData.toString(),{
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`
      }
    })
    alert('Your profile has been updated...')
    window.location.href=`index.html`
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