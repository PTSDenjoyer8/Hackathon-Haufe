async function fetchPartyDetails(code) {
    const response = await fetch('http://127.0.0.1:5000/get_parties');
    if (response.ok) {
        const parties = await response.json();
        const partyInfo = document.getElementById('partyInfo');
        const rolesContainer = document.getElementById('rolesContainer');
        partyInfo.innerHTML = ''; 
        rolesContainer.innerHTML = '';

        const party = parties.find(p => p.code === code); 

        if (party) {
            partyInfo.innerHTML = `
                <p><strong>Organizer:</strong> ${party.organizer}</p>
                <p><strong>Party Name:</strong> ${party.party_name}</p>
                <p><strong>Date:</strong> ${party.date}</p>
                <p><strong>Location:</strong> ${party.location}</p>
                <p><strong>Dressing Code:</strong> ${party.dressing_code}</p>
                <p><strong>Max People:</strong> ${party.max_people}</p>
                <p><strong>Price:</strong> ${party.price}</p>
                <p><strong>Roles:</strong> ${party.roles}</p>
                <p><strong>Code:</strong> ${party.code}</p>
            `;

            const roles = party.roles.split(',');
            roles.forEach(role => {
                const button = document.createElement('button');
                button.textContent = role.trim(); 
                button.onclick = () => alert(`You selected the role: ${role.trim()}`);
                rolesContainer.appendChild(button);
            });
        } else {
            partyInfo.innerHTML = '<p>Party not found.</p>';
        }
    } else {
        console.error('Failed to fetch party details');
    }
}

const urlParams = new URLSearchParams(window.location.search);
const partyCode = urlParams.get('code');

if (partyCode) {
    fetchPartyDetails(partyCode);
} else {
    document.getElementById('partyInfo').innerHTML = '<p>No party code provided.</p>';
}
