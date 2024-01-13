const emailDOM = document.querySelector('.email-Input')
const pswdDOM = document.querySelector('.pswd-Input')
const formDOM = document.querySelector('.form')
const formAlertDOM = document.querySelector('.form-alert')

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
    
    // const email = emailDOM.value
    // const password = pswdDOM.value
    try{
      const email = emailDOM.value
      const password = pswdDOM.value
      const formData = new FormData(formDOM)
      formData.append('email',email)
      formData.append('password',password)
      const response = await axios.post('/api/v1/auth/login', {email,password},{
        headers :{
          'Content-Type': 'application/x-www-form-urlencoded',
      } 
      });
      console.log('Api response',response);
      const { data } = response;

      localStorage.setItem('token', data.token)
      localStorage.setItem('username',data.user.username)
      window.location.href = `blog-home-page.html`
    }catch(error){
        alert('Email or password are incorrect...');
    }

})