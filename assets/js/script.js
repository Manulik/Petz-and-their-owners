let pets = [];
document.querySelector('#submit').addEventListener('click', () => {
    let email = document.querySelector('#email');
    let descr = document.querySelector('#descr');
    let petsFromLocal = JSON.parse(localStorage.getItem('pets'));

    let pet = {
        email: email.value,
        problem: descr.value,
        id: 1
    };

    if(localStorage.getItem('pets') != undefined) {
        pet.id = petsFromLocal[petsFromLocal.length-1].id + 1;
        petsFromLocal.push(pet);
        pushInLocal(petsFromLocal);
    } else {
        pets.push(pet);
        pushInLocal(pets);
    }

    email.value = '';
    descr.value = '';

    getPet();
});

function pushInLocal(arr) {
    localStorage.setItem('pets', JSON.stringify(arr));
}

function getPet() {
    let petsFromLocal = JSON.parse(localStorage.getItem('pets'));
    let pet = petsFromLocal[petsFromLocal.length - 1];
    let Div = document.createElement('h3');
    document.querySelector('.fromJS').appendChild(Div);
    Div.className = 'pet-title';
    Div.innerHTML = pet.id + '. ' + pet.email + ' ------- ' + pet.problem;

    let btn = document.createElement('button');
    btn.innerHTML = 'remove';
    btn.className="remove-btn";
    petsFromLocal.forEach(pet => {
        btn.id = pet.id;
    });
    btn.addEventListener('click', () => {
        removeButton(pet.id);
    });
    document.querySelector('.fromJS').appendChild(btn);

    let editBtn = document.createElement('button');
    editBtn.innerHTML = 'edit';
    editBtn.className= "edit-btn";
    editBtn.id = pet.id;
    editBtn.addEventListener('click', () => {
            editButton(editBtn.id);
    });
    document.querySelector('.fromJS').appendChild(editBtn);
}

function removeButton(id) {
    let petsLocal2 = JSON.parse(localStorage.getItem('pets'));
    for (pet in petsLocal2) {
        if(petsLocal2.length > 1) {
            if(petsLocal2.indexOf(petsLocal2[pet]) === id-1) {
                let rightPet =  petsLocal2.indexOf(petsLocal2[pet]);
                petsLocal2.splice(rightPet, 1);
    
                for(let i = 0; i < petsLocal2.length; i++) {
                    petsLocal2[i].id = petsLocal2.indexOf(petsLocal2[i]) + 1;
                    console.log(petsLocal2[i]);
                    localStorage.removeItem('pets');
                    localStorage.setItem('pets', JSON.stringify(petsLocal2));
                    location.reload();
                }
            }
            else {
                console.log('loh');
            }
        } else {
            localStorage.removeItem('pets');
            location.reload();
        }
    }
}

function editButton(id) {
    let petsLocal2 = JSON.parse(localStorage.getItem('pets'));
    let modal = document.getElementById('myModal');
    let editEmail = document.getElementById('editEmail');
    let editProblem = document.getElementById('editProblem');
    let toId = document.getElementById('toId');

    for(let i = 0; i < petsLocal2.length; i++) {
        if(petsLocal2.indexOf(petsLocal2[i]) === id-1) {
            let rightPet = petsLocal2[petsLocal2.indexOf(petsLocal2[i])];
            editEmail.value = rightPet.email;
            editProblem.value = rightPet.problem;
            toId.innerHTML = rightPet.id;
        }
    }
    modal.style.display = 'block';
}

document.getElementById('editPet').addEventListener('click', () => {
    let petsLocal2 = JSON.parse(localStorage.getItem('pets'));
    let editEmail = document.getElementById('editEmail');
    let editProblem = document.getElementById('editProblem');
    let toId = document.getElementById('toId');
    let id = Number(toId.textContent);
    let modal = document.getElementById('myModal');
    // console.log(editEmail.value, editProblem.value);
    for(let i = 0; i < petsLocal2.length; i++) {
        console.log(petsLocal2.indexOf(petsLocal2[i]), id - 1)
        if(petsLocal2.indexOf(petsLocal2[i]) === id - 1) {
            petsLocal2[i].email = editEmail.value;
            petsLocal2[i].problem = editProblem.value;
            localStorage.removeItem('pets');
            localStorage.setItem('pets', JSON.stringify(petsLocal2));
            modal.style.display = 'none';
        }
        // else {
        //     console.log('You are fucking lozer')
        // }
    } 
    location.reload();
});

document.getElementById('close').addEventListener('click', () => {
    let modal = document.getElementById('myModal');
    modal.style.display = 'none';
});

window.onclick = (event) => {
    let modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

window.onload = () => {
    if(localStorage.getItem('pets') != null) {
        let petsFromLocal = JSON.parse(localStorage.getItem('pets'));

        petsFromLocal.forEach(pet => {
            let Div = document.createElement('div');
            Div.className = 'item';
            document.querySelector('.fromJS').appendChild(Div);

            let title = document.createElement('h3');
            title.className = 'pet-title';
            Div.appendChild(title);
            title.innerHTML = pet.id + '. ' + pet.email + ' ------- ' + pet.problem;
            
            buttonsWrapper = document.createElement('div');
            buttonsWrapper.className = 'buttons-wrapper';
            Div.appendChild(buttonsWrapper);

            let removeBtn = document.createElement('button');
            removeBtn.className= "remove-btn";
            removeBtn.id = pet.id;
            // removeBtn.style.background = 'url(./assets/images/trash.svg)';
            removeBtn.addEventListener('click', () => {
                removeButton(removeBtn.id);
            });
            buttonsWrapper.appendChild(removeBtn);

            let editBtn = document.createElement('button');
            // editBtn.innerHTML = 'edit';
            editBtn.className= "edit-btn";
            editBtn.id = pet.id;
            editBtn.addEventListener('click', () => {
                editButton(editBtn.id);
            });
            buttonsWrapper.appendChild(editBtn);
        });
    } else {
        return null;
    }
};