async function fetchParties() {
    const response = await fetch('http://127.0.0.1:5000/get_parties');
    if (response.ok) {
        const parties = await response.json();
        const partyUl = document.getElementById('partyUl');
        partyUl.innerHTML = '';

        parties.forEach(party => {
            const li = document.createElement('li');
            li.textContent = `${party.party_name} - Organized by ${party.organizer}`;
            li.dataset.code = party.code; 
            
            li.addEventListener('click', () => {
                window.location.href = `partyDetails.html?partyName=${encodeURIComponent(party.party_name)}&code=${party.code}`;
            });
            
            partyUl.appendChild(li);
        });
    } else {
        console.error('Failed to fetch parties');
    }
}

document.getElementById('viewPartyButton').addEventListener('click', async () => {
    const codeInput = document.getElementById('partyCodeInput').value;

    if (!codeInput) {
        alert('Please enter a party code.');
        return;
    }

    const partyItems = document.querySelectorAll('#partyUl li');
    let foundParty = false;

    for (const item of partyItems) {
        if (item.dataset.code === codeInput) {
            foundParty = true;
            window.location.href = `partyDetails.html?partyName=${encodeURIComponent(item.textContent.split(' - ')[0])}&code=${codeInput}`;
            break;
        }
    }

    if (!foundParty) {
        alert('Party not found with the given code.');
    }
});

fetchParties();



const numeCont = localStorage.getItem('nume')
document.getElementById('cont').textContent = numeCont;
