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

    const li = document.createElement('div');
    li.className = "passDiv";

     // Set a specific color for the circular element
     const color = getRandomColor();
    li.innerHTML = `
    <div class="row">
        <span class="circular" style="background-color: ${color}">${First}</span>
        <div id='secondary' class='element'>
            <div id='first' class='element' style="color:white">${site}</div>
            <div id='second' class='element' style="color:white">${username}</div>
            <div id="show" class='element' style="color:white">${password}</div>
            </div>
            <div class="delete " onclick="deletePassword(this)"><i class="fa-solid fa-trash"></i></div>
        </div>`;

    document.getElementById("site").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById('passwords').appendChild(li);

    updateList();
    
    
}

// Toggle password visibility
// document.getElementById('togglePasswords').addEventListener('change', function () {
//     const showPasswords = this.checked;

//     const passwordElements = document.querySelectorAll('#show');
//     passwordElements.forEach((passwordElement) => {
//         passwordElement.style.display = showPasswords ? 'block' : 'none';
//     });
// });

function deletePassword(element) {
    element.parentNode.parentNode.parentNode.remove();
    updateList();
}
//finding the list in search bar  and adding an event listener to it 
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function () {
    const passwords = document.getElementById('passwords');
    const searchInputValue = this.value.trim().toLowerCase();
    const passDivs = Array.from(passwords.getElementsByClassName('passDiv'));

    passDivs.forEach((div) => {
        const site = div.querySelector('#first').textContent.toLowerCase();
        const username = div.querySelector('#second').textContent.toLowerCase();
        const password = div.querySelector('#show').textContent.toLowerCase();
        const itemText = `${site} ${username} ${password}`;

        if (itemText.includes(searchInputValue)) {
            div.style.display = 'block';
        } else {
            div.style.display = 'none';
        }
    });
});
// Update the count and show "Empty" message if there are no passwords
function updateList() {
    const passwords = document.getElementById('passwords');
    const passDivs = passwords.getElementsByClassName('passDiv');
    count = passDivs.length;
    const total = document.getElementById('count');
    total.textContent = count;

    if (count <= 0) {
        passwords.innerHTML = '<span class="empty-text"><i class="fa-solid fa-unlock"></i> Empty</span>';
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
