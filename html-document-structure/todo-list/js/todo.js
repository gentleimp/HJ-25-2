

const tasks = document.querySelectorAll('.todo-list input'),
	done = document.querySelector('.done'),
	undone = document.querySelector('.undone');

function taskChange (event) {
	if (event.currentTarget.checked !== true) {
		undone.appendChild(event.currentTarget.parentNode);
		return;
	}
	done.appendChild(event.currentTarget.parentNode);
}

for (task of tasks) {
	task.addEventListener('change', taskChange);	
}