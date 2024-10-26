const numeCont = localStorage.getItem('nume');
document.getElementById('cont').textContent = numeCont;

document.getElementById('submitBtn').addEventListener('click', async () => {
    const partyData = {
        organizer: numeCont,
        partyName: document.getElementById('partyName').value,
        date: document.getElementById('date').value,
        location: document.getElementById('location').value,
        dressingCode: document.getElementById('dressingCode').value,
        maxPeople: document.getElementById('maxPeople').value,
        price: document.getElementById('price').value,
        roles: document.getElementById('roles').value,
        partyType: document.getElementById('partyType').value,
        code: document.getElementById('code').value
    };

    try {
        const response = await fetch('http://localhost:5000/create_party', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(partyData)
        });

        const result = await response.json();
        if (response.ok) {
            alert('Party created successfully!');
        } else {
            alert('Error creating party: ' + result.message);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});
