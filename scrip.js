const filter = document.getElementById('filter');
const list = document.getElementById('list');
const add = document.getElementById('add');
const date = document.getElementById('date');

function saveToLocalStorage() {
    localStorage.setItem("data", list.innerHTML);
}



window.onload = function() {
    list.innerHTML = localStorage.getItem("data");
};

function addTask(){
    if(add.value < 3){
        alert('Need at least 2 characters');
    }
    else if(add.value > 255){
        alert('Too long');
    }
    else{
        let li = document.createElement('li');

        let taskSpan = document.createElement('span');
        taskSpan.className = 'task';
        taskSpan.innerHTML = add.value;

        let dateSpan = document.createElement('span');
        dateSpan.className = 'date';
        dateSpan.innerHTML = date.value;

        let closeSpan = document.createElement('span');
        closeSpan.className = 'close';
        closeSpan.innerHTML = "\u00D7";


        li.appendChild(taskSpan);
        li.appendChild(dateSpan);
        li.appendChild(closeSpan);
        list.appendChild(li);
        saveToLocalStorage();
    }
    add.value = '';
    date.value = '';
}


list.addEventListener('click', function(ev) {
    if (ev.target.className === 'task' || ev.target.className === 'date') {
        let taskSpan = ev.target.className === 'task' ? ev.target : ev.target.previousElementSibling;
        let dateSpan = taskSpan.nextElementSibling;
        let input = document.createElement('input');
        let dateInput = document.createElement('input');
        let saveButton = document.createElement('button');

        input.type = 'text';
        input.value = taskSpan.innerHTML;
        input.className = 'edit-task-input';

        dateInput.type = 'date';
        dateInput.value = dateSpan.innerHTML;
        dateInput.className = 'edit-date-input';

        saveButton.textContent = 'Save';
        saveButton.className = 'save-button';

        taskSpan.style.display = 'none';
        dateSpan.style.display = 'none';
        taskSpan.parentElement.insertBefore(input, taskSpan);
        taskSpan.parentElement.insertBefore(dateInput, dateSpan);
        taskSpan.parentElement.insertBefore(saveButton, dateSpan.nextSibling);

        saveButton.onclick = function () {
            if (input.value.length >= 3 && input.value.length <= 255) {
                taskSpan.innerHTML = input.value;
                dateSpan.innerHTML = dateInput.value;
                taskSpan.style.display = 'inline';
                dateSpan.style.display = 'inline';
                input.remove();
                dateInput.remove();
                saveButton.remove();
                saveToLocalStorage();
            } else {
                alert('The task name must be between 3 and 255 characters.');
            }
        };
    }
    if (ev.target.className === 'close') {
        ev.target.parentElement.remove();
        saveToLocalStorage();
    }

}, false);

function filterTasks() {
    let filterValue = filter.value.toLowerCase().trim(); // Convert to lowercase and trim spaces
    let tasks = list.getElementsByTagName('li');

    for (let i = 0; i < tasks.length; i++) {
        let taskSpan = tasks[i].getElementsByClassName('task')[0]; // Get the task element

        if (taskSpan) {
            let originalText = taskSpan.textContent;
            let lowerCaseText = originalText.toLowerCase();

            // Check if the task text includes the filter value
            if (lowerCaseText.indexOf(filterValue) > -1 && filterValue !== '') {
                // Highlight matching letters
                let startIndex = lowerCaseText.indexOf(filterValue);
                let endIndex = startIndex + filterValue.length;

                // Create a new string with the match highlighted
                let highlightedText =
                    originalText.substring(0, startIndex) +
                    `<span style="background-color: yellow;">` +
                    originalText.substring(startIndex, endIndex) +
                    `</span>` +
                    originalText.substring(endIndex);

                taskSpan.innerHTML = highlightedText; // Replace the task's content with the highlighted text
                tasks[i].style.display = ''; // Show the task
            } else {
                // Reset to original text and hide if no match
                taskSpan.innerHTML = originalText;
                tasks[i].style.display = filterValue ? 'none' : ''; // Hide only if there's a filter value
            }
        }
    }
}