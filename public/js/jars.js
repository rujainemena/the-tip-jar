const newFormHandler = async (event) => {
  event.preventDefault();

  const jarName = document.querySelector('#jar-name').value.trim();
  const dailyEarnings = document.querySelector('#daily-earning').value.trim();
  const shiftDate = document.querySelector('#shift-date').value.trim();

  alert(jarName + dailyEarnings + shiftDate)
  if (jarName && dailyEarnings && shiftDate) {
    const response = await fetch(`/api/jars`, {
      method: 'POST',
      body: JSON.stringify({ jarName, dailyEarnings, shiftDate }),
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

document
  .querySelector('.jar-list')
  .addEventListener('click', delButtonHandler);
