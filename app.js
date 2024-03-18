let count = 0;
// Initial update to show "Empty" when there are no items
updateList();
function addPassword() {
    const site = document.getElementById('site').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const First = site[0].toUpperCase();

    if (!site || !username || !password) {
        alert('Please fill in all fields');
        return;
    }
    if (!site.endsWith('.com')) {
        alert('Website link should end with ".com"');
        return;
    }
    if (password.length < 8) {
        alert('Minimum password should be 8 character');
        return;
    }
    const li = document.createElement('div');
    li.className = "passDiv";
    const color = getRandomColor();
    li.innerHTML = `<div class="row">
        <span class="circular" style="background-color: ${color}">${First}</span>
        <div id='secondary' class='element'>
            <div id='first' class='element' style="color:white">${site}</div>
            <div id='second' class='element' style="color:white">${username}</div>
            <div class="show element" style="color:white" data-original-password="${password}">${'*'.repeat(password.length)}</div>
        </div>
        <div class="delete" onclick="deletePassword(this)"><i class="fa-solid fa-trash"></i></div>
    </div>`;

    document.getElementById('passwords').appendChild(li);
    document.getElementById("site").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    // Save data to localStorage
    saveToLocalStorage(site, username, password);
    updateList();
    // window.location.reload();
}


//save to local storage
function saveToLocalStorage(site, username, password) {
    let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.push({ site, username, password });
    localStorage.setItem('passwords', JSON.stringify(passwords));
}


//deletes from passwords list
function deletePassword(element) {
    const site = element.parentNode.querySelector('#first').textContent;
    const username = element.parentNode.querySelector('#second').textContent;
    const password = element.parentNode.querySelector('.show').textContent;

    // Remove data from localStorage
    removeFromLocalStorage(site, username, password);

    element.parentNode.remove();
    updateList();
}

//removes data from local storage
function removeFromLocalStorage(site, username, password) {//it takes the deletePassword(site,username,passwords) and the data present in local storage filter the password according to conditions and make a new array which have a local storage wtih that deleted items
    let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords = passwords.filter((pass) => pass.site !== site || pass.username !== username || pass.password !== password);
    localStorage.setItem('passwords', JSON.stringify(passwords));
}


//finding the list in search bar and adding an event listener to it 

searchInput.addEventListener('input', function () {
    const passwords = document.getElementById('passwords');//select the ul with id 'passwords'
    const searchInputValue = this.value.trim().toLowerCase();
    const passDivs = Array.from(passwords.getElementsByClassName('passDiv'));//converts into array from the ul 
    passDivs.forEach((div) => {
        const site = div.querySelector('#first').textContent.toLowerCase();
        const itemText = `${site}`; //searching by website name
        if (itemText.includes(searchInputValue)) {  //in this items will show when the search Input match with items present in passDiv class
            div.style.display = 'block';
            updateList();
        }
        
        else {
            div.style.display = 'none';
            updateList();//else show the empty text
        }
    });
   
 
});


// Function to toggle password visibility
const togglePasswordsCheckbox = document.getElementById('togglePasswords');
function togglePasswordVisibility() {
    const showPasswords = togglePasswordsCheckbox.checked;
    const passwordElements = document.querySelectorAll('.show');//it select the password class with show

    passwordElements.forEach((passwordElement) => {

        if (showPasswords) {
            passwordElement.textContent = passwordElement.dataset.originalPassword;
        } else {
            passwordElement.textContent = '*'.repeat(passwordElement.dataset.originalPassword.length);
        }
    });
}

// Add event listener for checkbox state change
togglePasswordsCheckbox.addEventListener('change', togglePasswordVisibility);

// Initial load from localStorage 
document.addEventListener('DOMContentLoaded', () => {
    let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    const agCount = document.getElementById('count');
    let count = passwords.length;
    agCount.textContent = count;//it updates the count variable according to password saves
    if (passwords.length > 0) {
        passwords.forEach((pass) => {
            const { site, username, password } = pass;
            addPasswordToDOM(site, username, password);
            updateList()
        });
    } else {
        const passwordsElement = document.getElementById('passwords');
        passwordsElement.innerHTML = '<span class="empty-text"><i class="fa-solid fa-unlock"></i> Empty</span>';
        updateList()
    }
});

// Function to add password to DOM
function addPasswordToDOM(site, username, password) {
    const First = site[0].toUpperCase();
    const li = document.createElement('div');
    li.className = "passDiv";
    const color = getRandomColor();
    li.innerHTML = `<div class="row">
        <span class="circular" style="background-color: ${color}">${First}</span>
        <div id='secondary' class='element'>
            <div id='first' class='element' style="color:white">${site}</div>
            <div id='second' class='element' style="color:white">${username}</div>
            <div class="show element" style="color:white" data-original-password="${password}">${'*'.repeat(password.length)}</div>
        </div>
        <div class="delete" onclick="deletePassword(this)"><i class="fa-solid fa-trash"></i></div>
    </div>`;
    document.getElementById('passwords').appendChild(li);
    updateList();

    // Add event listener to toggle password visibility for newly created password
    const passwordElement = li.querySelector('.show');
    passwordElement.addEventListener('click', togglePasswordVisibility);
}

document.getElementById("myForm").addEventListener("submit", function (event) {
    var passwordInput = document.getElementById("password");
    if (!passwordInput.checkValidity()) {
        alert("Password must be at least 8 characters");
        event.preventDefault();
        return;
    }
    else {
        // Add item to the list
        var site = document.getElementById('site').value;
        var username = document.getElementById('username').value;
        var password = passwordInput.value;
        addPasswordToDOM(site, username, password);
        saveToLocalStorage(site, username, password);
        updateList();
    }
    event.preventDefault();
});



//delete the password saves in local storage
function deletePassword(element) {
    // Remove the password entry from the DOM
    element.parentNode.parentNode.remove();

    // Update the count and show "Empty" message if there are no passwords
    updateList();

    // Remove the password entry from localStorage
    const site = element.parentNode.parentNode.querySelector('#first').textContent;
    const username = element.parentNode.parentNode.querySelector('#second').textContent;
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    const updatedPasswords = passwords.filter((password) => {
        return !(password.site === site && password.username === username);
    });
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
}


// Update the count and show "Empty" message if there are no passwords
function updateList() {

    const passwordsDiv = document.getElementById('passwords');
    const passDivs = passwordsDiv.getElementsByClassName('passDiv');
    let visibleCount = 0;
    Array.from(passDivs).forEach((div) => {//it count the items  that have display:block
        if (div.style.display !== 'none') {
            visibleCount++;
        }
    });

    const total = document.getElementById('count');
    total.textContent = visibleCount;

    if (visibleCount === 0) {
        passwordsDiv.innerHTML = '<span class="empty-text"><i class="fa-solid fa-unlock"></i> Empty</span>';
    } else {
        const emptyText = document.querySelector('.empty-text');
        if (emptyText) {
            emptyText.remove();
        }
    }
}


function getRandomColor() {
    // Generate random values for red, green, and blue
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Construct a CSS color string
    const color = `rgb(${red}, ${green}, ${blue})`;

    return color;
}

function updateCircularColors() {
    const boxes = document.querySelectorAll('.circular');
    boxes.forEach((box) => {
        box.style.backgroundColor = getRandomColor();
    });
}



