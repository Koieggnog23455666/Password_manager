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
            <div id="show" class='element' style="color:white">${password}</div>
        </div>
        <div class="delete" onclick="deletePassword(this)"><i class="fa-solid fa-trash"></i></div>
    </div>`;
    document.getElementById("site").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById('passwords').appendChild(li);

    // Save data to localStorage
    saveToLocalStorage(site, username, password);
    updateList();
    // window.location.reload();

}

function saveToLocalStorage(site, username, password) {
    let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.push({ site, username, password });
    localStorage.setItem('passwords', JSON.stringify(passwords));
}

function deletePassword(element) {
    const site = element.parentNode.querySelector('#first').textContent;
    const username = element.parentNode.querySelector('#second').textContent;

    // Remove data from localStorage
    removeFromLocalStorage(site, username);

    element.parentNode.remove();
    updateList();
}

function removeFromLocalStorage(site, username) {
    let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords = passwords.filter((pass) => pass.site !== site || pass.username !== username);
    localStorage.setItem('passwords', JSON.stringify(passwords));
}
// Initial load from localStorage
document.addEventListener('DOMContentLoaded', () => {
    let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    const agCount = document.getElementById('count');
    let count = passwords.length;
    agCount.textContent = count;
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
            <div id="show" class='element' style="color:white">${'*'.repeat(password.length)}</div>
        </div>
        <div class="delete" onclick="deletePassword(this)"><i class="fa-solid fa-trash"></i></div>
    </div>`;
    document.getElementById('passwords').appendChild(li);
    updateList()
}
// Add an id to the checkbox
const togglePasswordsCheckbox = document.getElementById('togglePasswords');

// Add an event listener to the checkbox
togglePasswordsCheckbox.addEventListener('change', function() {
    const showPasswords = this.checked;
    // Select all password elements
    const passwordElements = document.querySelectorAll('#show');
    

    // Iterate over each password element
    passwordElements.forEach((passwordElement) => {
        // Check if the password is currently hidden
        const isHidden = passwordElement.textContent.includes('*');

        // Store original password before hiding
        if (!passwordElement.dataset.originalPassword) {
            passwordElement.dataset.originalPassword = passwordElement.textContent;
        }

        // Update password visibility based on the checkbox status and current visibility
        if (showPasswords && isHidden) {
            // Replace asterisks with actual password
            passwordElement.innerHTML = passwordElement.dataset.originalPassword;
        } else {
            // Replace actual password with asterisks
            passwordElement.textContent = '*'.repeat(passwordElement.dataset.originalPassword.length);
        }
    });
});





document.getElementById("myForm").addEventListener("submit", function (event) {
    var itemNameInput = document.getElementById("password");
    if (!itemNameInput.checkValidity()) {
        alert("Password must be at least 8 characters");
        event.preventDefault();
        return;
    }
    else {
        // Add item to the list
        var itemList = document.getElementById("passwords");
        var itemText = itemNameInput.value;
        var li = document.getElementsByClassName("passDiv");
        li.textContent = itemText;
        itemList.appendChild(li);
    }
    event.preventDefault();
});

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

//finding the list in search bar  and adding an event listener to it 
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function () {
    const passwords = document.getElementById('passwords');
    const searchInputValue = this.value.trim().toLowerCase();
    const passDivs = Array.from(passwords.getElementsByClassName('passDiv'));
    passDivs.forEach((div) => {
        const site = div.querySelector('#first').textContent.toLowerCase();
        // const username = div.querySelector('#second').textContent.toLowerCase();
        // const password = div.querySelector('#show').textContent.toLowerCase();
        const itemText = `${site}`;
        if (itemText.includes(searchInputValue)) {
            div.style.display = 'block';
            updateList()
        } else {
            div.style.display = 'none';
            updateList()
        }
    });
});
clearButton.addEventListener('click', () => {
    searchInput.value = '';
    Array.from(passDivs).forEach((div) => {
        div.style.display = 'block';
    });

    passwordsDiv.innerHTML = originalContent;
    updateList();
});
// Update the count and show "Empty" message if there are no passwords
function updateList() {
    // const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    // const passwordsDiv = document.getElementById('passwords');

    // const passDivs = passwordsDiv.getElementsByClassName('passDiv');
    // count = passDivs.length;
    // const total = document.getElementById('count');
    // total.textContent = count;
    // if (count === 0) {
    //     passwordsDiv.innerHTML = '<span class="empty-text"><i class="fa-solid fa-unlock"></i> Empty</span>';
    // } else {
    //     const emptyText = document.querySelector('.empty-text');
    //     if (emptyText) {
    //         emptyText.remove();
    //     }
    // }
    const passwordsDiv = document.getElementById('passwords');
    const passDivs = passwordsDiv.getElementsByClassName('passDiv');
    let visibleCount = 0;
    Array.from(passDivs).forEach((div) => {
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



