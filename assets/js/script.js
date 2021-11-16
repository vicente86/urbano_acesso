
const searchInput = document.getElementById('search');
const resultList = document.getElementById('lista-resultado');
const mapContainer = document.getElementById('map-container');
const currentMarkers = [];

// EVENTO DE BOTÕES DO MODAL

function botao_add(){
        
    document.querySelector(".caixa-modal-form-add").style.display = "flex";
    document.querySelector(".caixa-modal-form-add").style.justifyContent = "center";
    document.querySelector(".caixa-modal-form-add").style.alignItems = "center";
}

function fechar(){
    document.querySelector(".caixa-modal-form-add").style.display = "none";
}

function cancelar(){
    document.querySelector(".caixa-modal-form-add").style.display = "none";
}

// FORMULÁRIO MODAL


// PESQUISA UL MODAL


// MAPA

const map = L.map(mapContainer).setView([20.13847, 1.40625], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

document.getElementById('search-button').addEventListener('click', () => {
    const query = searchInput.value;
    fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + query)
        .then(result => result.json())
        .then(parsedResult => {
            setResultList(parsedResult);
        });
});

function setResultList(parsedResult) {
    resultList.innerHTML = "";
    for (const marker of currentMarkers) {
        map.removeLayer(marker);
    }
    map.flyTo(new L.LatLng(20.13847, 1.40625), 2);
    for (const result of parsedResult) {
        const li = document.createElement('li');
        
        resultList.style.overflowY = "scroll";

        li.innerHTML = JSON.stringify({
            Informações: result.display_name,
            lat: result.lat,
            lon: result.lon
        }, undefined, 2);

        li.addEventListener('click', (event) => {
            for(const child of resultList.children) {
                child.classList.remove('active');
            }
            event.target.classList.add('active');
            const clickedData = JSON.parse(event.target.innerHTML);
            const position = new L.LatLng(clickedData.lat, clickedData.lon);
            map.flyTo(position, 14);
        })
        const position = new L.LatLng(result.lat, result.lon);
        currentMarkers.push(new L.marker(position).addTo(map));
        resultList.appendChild(li);
    }
}


