const taskList = document.querySelector('.list-block'),
	tasks = document.querySelectorAll('.list-block input'),
	output = document.querySelector('.list-block output');

function taskChange (event) {
	if (event.currentTarget.checked !== true) {
		output.innerHTML--;		
		taskList.classList.remove('complete');
		return;
	}
	output.innerHTML++;
	if (output.innerHTML == 4 ) {
		taskList.classList.add('complete');	
	}		
}

output.innerHTML = '';

for (task of tasks) {
	task.addEventListener('change', taskChange);
	if (task.checked == true) {
		output.innerHTML++;
	}
}
    
if (output.innerHTML == 4 ) {
	taskList.classList.add('complete');;
}