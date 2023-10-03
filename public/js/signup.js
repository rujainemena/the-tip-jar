

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const monthlyGoal = document.querySelector('#goal-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

alert(name + monthlyGoal + email + password)

  if (name && monthlyGoal && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, monthly_goal: 0.0 }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        // If successful, redirect the browser to the jars page
      document.location.replace('/jars');
    } else {
      alert(response.statusText);
    }
  }
};


document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
