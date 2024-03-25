/** @format */

let data;

async function caricaJSON() {
	const response = await fetch('places/places.json');
	const json = await response.json();
	return json;
}

async function loadData() {
	if (!data) {
		data = await caricaJSON();
	}
}

async function mostraScelta() {
	await loadData();

	const pastoSelect = document.getElementById('pasto');

	const tipoPastoScelto = pastoSelect.value;
	const postiFiltrati = data.filter((place) =>
		place.pasto.includes(tipoPastoScelto)
	);

	if (postiFiltrati.length > 0) {
		const postoCasuale =
			postiFiltrati[Math.floor(Math.random() * postiFiltrati.length)];
		mostraRisultato(postoCasuale);
	} else {
		mostraRisultato({ nome: 'Nessun posto trovato' });
	}
}

function mostraRisultato(posto) {
	const risultatoDiv = document.getElementById('risultato');
	risultatoDiv.innerHTML = `
    <div class="card">
        <a><img class="card-image" src="${posto.immagine}" alt="${
		posto.nome
	}"></a>
        <p class="card-title"><strong>${posto.nome}</strong></p>
        <p class="card-desc">${posto.pasto
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(', ')}</p>
        <div class="card-buttons">
            <a class="card-button" href="${
				posto.google_maps
			}" target="_blank"><i class="fa-solid fa-location-dot"></i></a>
            <a class="card-button" href="${
				posto.sito
			}" target="_blank"><i class="fa-solid fa-globe"></i></a>
        </div>
    </div>
    `;
}

function impostaValorePredefinito() {
	const pastoSelect = document.getElementById('pasto');
	const oraCorrente = new Date().getHours();

	if (oraCorrente >= 5 && oraCorrente < 11) {
		pastoSelect.value = 'colazione';
	} else if (oraCorrente >= 11 && oraCorrente < 15) {
		pastoSelect.value = 'pranzo';
	} else if (oraCorrente >= 15 && oraCorrente < 18) {
		pastoSelect.value = 'merenda';
	} else if (oraCorrente >= 18 && oraCorrente < 20) {
		pastoSelect.value = 'aperitivo';
	} else if (oraCorrente >= 20 && oraCorrente < 24) {
		pastoSelect.value = 'cena';
	} else if (oraCorrente >= 0 && oraCorrente < 5) {
		pastoSelect.value = 'notturno';
	}
}

document.addEventListener('DOMContentLoaded', async function () {
	await loadData();

	impostaValorePredefinito();

	const mostraSceltaBtn = document.getElementById('mostraScelta');

	mostraSceltaBtn.addEventListener('click', function () {
		mostraScelta();
	});
});
