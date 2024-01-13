const formDOM = document.querySelector('form')
const emailDOM = document.querySelector('[name="email"]')
const passwordDOM = document.querySelector('[name="password"]')
const formAlertDOM = document.querySelector('form-alert')

formDOM.addEventListener('submit', async(e) => {
    e.preventDefault()

    // Get the email value from the input field
    const emailId = document.getElementById('emailId').value;
    // Validate the email using a regular expression (similar to MongoDB validation)
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(emailId)) {
        alert('Please enter a valid email address.');
        return false;
    }

    try{
        const email = emailDOM.value
        const password = passwordDOM.value

        const formData = new URLSearchParams();
        formData.append('email', email)
        formData.append('password', password)

        const response = await axios.post('api/v1/auth/updatePassword', formData.toString(),{
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }
        })
        console.log(response);
        const { data } = response
        localStorage.setItem('token', data.token)
        window.location.href = `index.html`

    }catch(error){
        if (error.response && error.response.status === 400 && error.response.data && error.response.data.error === 'Email already exists') {
            alert('Email already exists. Please use a different email.');
        } else {
            console.error('Registration error:', error);
            alert('An unexpected error occurred during registration.');
        }
    }
})