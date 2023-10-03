const newFormHandler = async (event) => {
  event.preventDefault();

  const jarname = document.querySelector('#project-name').value.trim();
  const daily_earnings = document.querySelector('#project-funding').value.trim();
  const description = document.querySelector('#project-desc').value.trim();
  alert(jarname+daily_earnings+description)
  if (jarname && daily_earnings && description) {
    const response = await fetch(`/api/jars`, {
      method: 'POST',
      body: JSON.stringify({ jarname, daily_earnings, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/jars/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
