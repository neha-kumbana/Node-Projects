const unameDOM = document.querySelector('.uname-input')
const emailDOM = document.querySelector('.email-input')
const nameDOM = document.querySelector('.name-input')
const bioDOM = document.querySelector('.bio-input')
const linkDOM = document.querySelector('.link-input')
const pswdDOM = document.querySelector('.pswd-input')
const formAlertDOM = document.querySelector('.form-alert')
const formDOM = document.querySelector('.form')

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
  
  // Get the email value from the input field
    const emailId = document.getElementById('emailId').value;
    // Validate the email using a regular expression (similar to MongoDB validation)
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(emailId)) {
        alert('Please enter a valid email address.');
        return false;
    }

    try {
        const username = unameDOM.value
        const email = emailDOM.value
        const fullName = nameDOM.value
        const bio = bioDOM.value
        const socialMediaLinks = linkDOM.value
        const password = pswdDOM.value
        const formData = new URLSearchParams;
        formData.append('username',username)
        formData.append('email',email)
        formData.append('fullName',fullName)
        formData.append('bio',bio)
        formData.append('socialMeadiaLinks',socialMediaLinks)
        formData.append('password',password)
        const response = await axios.post('/api/v1/auth/register', formData.toString());

        const { data } = response;

        localStorage.setItem('token', data.token)
        
        window.location.href = 'index.html';
    } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data && error.response.data.error === 'Email already exists') {
            alert('Email already exists. Please use a different email.');
        } else {
            console.error('Registration error:', error);
            alert('An unexpected error occurred during registration.');
        }
    }
});
      



