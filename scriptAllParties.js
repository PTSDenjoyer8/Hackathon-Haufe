document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:5000/get_parties');
        const parties = await response.json();

        const container = document.createElement('div');
        container.className = 'parties-container';

        if (parties.length === 0) {
            container.innerHTML = '<p>No public parties available.</p>';
        } else {
            parties.forEach(party => {
                const partyDiv = document.createElement('div');
                partyDiv.className = 'party-card';
                partyDiv.innerHTML = `
                    <h3>${party.party_name}</h3>
                    <p><strong>Organizer:</strong> ${party.organizer}</p>
                    <p><strong>Date:</strong> ${party.date}</p>
                    <p><strong>Location:</strong> ${party.location}</p>
                    <p><strong>Dressing Code:</strong> ${party.dressing_code}</p>
                    <p><strong>Max People:</strong> ${party.max_people}</p>
                    <p><strong>Price:</strong> $${party.price}</p>
                    <p><strong>Roles:</strong> ${party.roles}</p>
                    <p><strong>Type:</strong> ${party.party_type}</p>
                    <p><strong>Inviting Code:</strong> ${party.code}</p>
                `;
                container.appendChild(partyDiv);
            });
        }

        document.body.appendChild(container);
    } catch (error) {
        console.error('Error fetching parties:', error);
    }
});
const numeCont = localStorage.getItem('nume')
document.getElementById('cont').textContent = numeCont;