const newFormHandler = async (event) => {
  event.preventDefault();

  const jar_name = document.querySelector('#jar-name').value.trim();
  const daily_earnings = document.querySelector('#daily-earning').value.trim();
  const shift_date = document.querySelector('#shift-date').value.trim();

  // alert(jar_name + daily_earnings + shift_date)
  if (jar_name && daily_earnings && shift_date) {
    const response = await fetch(`/api/jars`, {
      method: 'POST',
      body: JSON.stringify({ jar_name, daily_earnings, shift_date }),
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

    const response = await fetch(`/api/projects/${id}`, {
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
  .querySelector('.new-tip-jar')
  .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.jar-list')
//   .addEventListener('click', delButtonHandler);
