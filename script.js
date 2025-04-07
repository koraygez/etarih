const HIGHLIGHTED_COUNTRIES = [
    "TUR",
    "SYR",
    "EGY",
    "SAU",
    "IRQ",
    "ISR",
    "JOR",
    "LBN",
    "PSE",
    "CYP",
    "GRC",
    "BGR",
    "MKD",
    "ALB",
    "SRB",
    "BIH",
    "ROU",
    "MDA"
];

const HIGHLIGHTED_COUNTRIES_FATIH = [
    "TUR",
    "GRC",
    "BGR",
    "MKD",
    "ALB",
    "SRB",
    "BIH",
    "ROU",
    "MDA"
];


const remove = document.getElementById("remove");
const yavuzSultanSelim = document.getElementById("yavuz-sultan-selim");
const fatihSultanMemet = document.getElementById("fatih-sultan-mehmet");
const kanuniSultanSuleyman = document.getElementById("kanuni-sultan-suleyman");


let countriesLayer;
let highlightCountries = false;
const map = L.map('map').setView([40, 42], 4);


const istanbulPoint = [41.0082, 28.9784];
const marker = L.marker([41.0082, 28.9784]);
const marker1 = L.marker([41.0082, 29.0784]);
const kirimMarker = L.marker([45.3453, 36.5728]);
const trabzonMarker = L.marker([41.0027, 39.7168]);
const sirbistanMarker = L.marker([44.8125, 20.4612]);
const moraMarker = L.marker([37.9838, 23.7275]);
const bogdanMarker = L.marker([47.0243, 28.8323]);
const iyonMarker = L.marker([40.1473, 18.4862]);
const amasraMarker = L.marker([41.7456, 32.3870]);
const sinopMarker = L.marker([42.0264, 35.1551]);
const eflakMarker = L.marker([44.4396, 26.0963]);
const otlukbeliMarker = L.marker([39.9208, 32.8541]);

countriesLayer = L.geoJson(countries, {
    style: countriesStyles,
    onEachFeature: onEachFeature
}).addTo(map);

function getCountryColor(SOV_A3) {
    return highlightCountries && HIGHLIGHTED_COUNTRIES.includes(SOV_A3) ? 'rgb(215, 143, 64)' : 'rgb(183, 184, 162)';
}

function getCountryColorFatih(SOV_A3) {
    return highlightCountries && HIGHLIGHTED_COUNTRIES_FATIH.includes(SOV_A3) ? 'rgb(215, 143, 64)' : 'rgb(183, 184, 162)';
}

function countriesStyles(feature) {
    return {
        fillColor: getCountryColor(feature.properties.SOV_A3),
        weight: 1,
        opacity: 1,
        color: '#fff',
        dashArray: '1',
        fillOpacity: 1
    };
}

function countriesStylesFatih(feature) {
    return {
        fillColor: getCountryColorFatih(feature.properties.SOV_A3),
        weight: 1,
        opacity: 1,
        color: '#fff',
        dashArray: '1',
        fillOpacity: 1
    };
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({ click: zoomToFeature });
}

function resetHighlight(e) {
    countriesLayer.resetStyle(e.target);
}

function updateCountryStyles() {
    countriesLayer.setStyle(countriesStyles);
}

function updateCountryStylesFatih() {
    countriesLayer.setStyle(countriesStylesFatih);
}

async function fetchFatihPopupContent() {
    updateCountryStyles();
    
    try {
        const response = await fetch('fatihSultanMehmet.json');
        const data = await response.json();

        const firstPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; height: 100%; padding: 20px; box-sizing: border-box; overflow-y: auto;">
                <h2 style="text-align: center; color: darkblue; font-size: 28px; margin-bottom: 25px;">${data.title}</h2>
                <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 25px; flex-wrap: wrap;">
                    <div style="text-align: center; padding: 8px; background-color: #f5f5f5; border-radius: 8px; min-width: 150px;">
                        <p style="margin: 0;"><strong>Doğum:</strong> ${data.birth}</p>
                    </div>
                    <div style="text-align: center; padding: 8px; background-color: #f5f5f5; border-radius: 8px; min-width: 150px;">
                        <p style="margin: 0;"><strong>Saltanat:</strong> ${data.reign}</p>
                    </div>
                    <div style="text-align: center; padding: 8px; background-color: #f5f5f5; border-radius: 8px; min-width: 150px;">
                        <p style="margin: 0;"><strong>Ölüm:</strong> ${data.death}</p>
                    </div>
                </div>
                <img src="${data.pages[0].image}" alt="${data.pages[0].title}" style="max-width: 80%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            </div>
        `;

        const secondPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; height: 100%; padding: 20px; box-sizing: border-box; overflow-y: auto;">
                <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 15px;">${data.pages[0].title}</h2>
                <div style="display: flex; flex-direction: row; width: 100%; gap: 15px; flex-wrap;">
                    <div style="flex: 1; min-width: 300px;">
                        <img src="${data.pages[0].image}" alt="${data.pages[0].title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                    </div>
                    <div style="flex: 1; min-width: 300px; padding: 15px; background-color: #f5f5f5; border-radius: 8px; overflow-y: auto;">
                        <p style="font-size: 16px; line-height: 1.6; margin: 0;">${data.pages[0].content}</p>
                    </div>
                </div>
            </div>
        `;

        const thirdPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; height: 100%; padding: 20px; box-sizing: border-box; overflow-y: auto;">
                <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 25px;">${data.pages[1].title}</h2>
                <div style="display: flex; flex-direction: row; width: 100%; gap: 25px; flex-wrap: wrap; justify-content: center;">
                    <div style="flex: 1; min-width: 300px; display: flex; justify-content: center; align-items: flex-start;">
                        <img src="${data.pages[1].image}" alt="${data.pages[1].title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                    </div>
                    <div style="flex: 1; min-width: 300px; padding: 20px; background-color: #f5f5f5; border-radius: 8px; overflow-y: auto; display: flex; flex-direction: column; justify-content: flex-start;">
                        <p style="font-size: 16px; line-height: 1.8; margin: 0; text-align: justify;">${data.pages[1].content}</p>
                    </div>
                </div>
            </div>
        `;

        const fourthPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; height: 100%; padding: 20px; box-sizing: border-box; overflow-y: auto;">
                <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 15px;">${data.pages[2].title}</h2>
                <div style="display: flex; flex-direction: row; width: 100%; gap: 15px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 300px;">
                        <img src="${data.pages[2].image}" alt="${data.pages[2].title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                    </div>
                    <div style="flex: 1; min-width: 300px; padding: 15px; background-color: #f5f5f5; border-radius: 8px; overflow-y: auto;">
                        <p style="font-size: 16px; line-height: 1.6; margin: 0;">${data.pages[2].content}</p>
                    </div>
                </div>
            </div>
        `;

        const fifthPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; height: 100%; padding: 20px; box-sizing: border-box; overflow-y: auto;">
                <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 15px;">${data.pages[3].title}</h2>
                <div style="display: flex; flex-direction: row; width: 100%; gap: 15px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 300px;">
                        <img src="${data.pages[3].image}" alt="${data.pages[3].title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                    </div>
                    <div style="flex: 1; min-width: 300px; padding: 15px; background-color: #f5f5f5; border-radius: 8px; overflow-y: auto;">
                        <p style="font-size: 16px; line-height: 1.6; margin: 0;">${data.pages[3].content}</p>
                    </div>
                </div>
            </div>
        `;

        const sixthPopupContent = `
            <iframe src="https://ogmmateryal.eba.gov.tr/panel/panel/ZamanCizelgesiOnizle.aspx?alistirmaId=30443" style="width: 100%; height: 100%; border: none;"></iframe>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, () => {
                createPopup(thirdPopupContent, () => {
                    createPopup(fourthPopupContent, () => {
                        createPopup(fifthPopupContent, () => {
                            createPopup(sixthPopupContent, null, () => createPopup(fifthPopupContent, () => createPopup(fourthPopupContent, () => createPopup(thirdPopupContent, () => createPopup(secondPopupContent, () => createPopup(firstPopupContent))))));
                        }, () => createPopup(fourthPopupContent, () => createPopup(thirdPopupContent, () => createPopup(secondPopupContent, () => createPopup(firstPopupContent)))));
                    }, () => createPopup(thirdPopupContent, () => createPopup(secondPopupContent, () => createPopup(firstPopupContent))));
                }, () => createPopup(secondPopupContent, () => createPopup(firstPopupContent)));
            }, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error("yakında eklenecek", error);
        createPopup(`<p style="color: black;">yakında eklenecek</p>`);
    }
}

async function fetchKirimPopupContent() {
    try {
        const response = await fetch('kirimAlinmasi.json');
        const data = await response.json();

        const firstPopupContent = `
            <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 20px;">${data.title}</h2>
            <video src="${data.video}" controls autoplay style="width: 80%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></video>
        `;

        const secondPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%; padding: 20px; box-sizing: border-box;">
                <div style="display: flex; flex-direction: row; width: 100%; margin-bottom: 20px;">
                    <div style="flex: 1; display: flex; justify-content: center; align-items: center; padding: 10px; max-width: 200px;">
                        <img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></img>
                    </div>
                    <div style="flex: 2; padding: 10px; text-align: left; font-size: 16px; overflow-y: auto;">
                        <p><strong>Tarihi:</strong> ${data.details[0]}</p>
                        <p><strong>Sebebi:</strong> ${data.details[1]}</p>
                        <p><strong>Sonuçları:</strong> ${data.details[2]}</p>
                        <p>${data.description}</p>
                    </div>
                </div>
            </div>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, null, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error("yakında eklenecek", error);
        createPopup(`<p style="color: black;">yakında eklenecek</p>`);
    }
}

async function fetchTrabzonPopupContent() {
    try {
        const response = await fetch('trabzonAlinmasi.json');
        const data = await response.json();

        const firstPopupContent = `
            <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 20px;">${data.title}</h2>
            <video src="${data.video}" controls autoplay style="width: 80%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></video>
        `;

        const secondPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%; padding: 20px; box-sizing: border-box;">
                <div style="display: flex; flex-direction: row; width: 100%; margin-bottom: 20px;">
                    <div style="flex: 1; display: flex; justify-content: center; align-items: center; padding: 10px;">
                        <img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></img>
                    </div>
                    <div style="flex: 1; padding: 10px; text-align: left; font-size: 16px;">
                        <p><strong>Tarihi:</strong> ${data.details[0]}</p>
                        <p><strong>Sebebi:</strong> ${data.details[1]}</p>
                        <p><strong>Sonuçları:</strong> ${data.details[2]}</p>
                    </div>
                </div>
                <div style="flex: 1; padding: 10px; text-align: left; font-size: 16px; overflow-y: auto;">
                    <p>${data.description}</p>
                </div>
            </div>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, null, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error("yakında eklenecek", error);
        createPopup(`<p style="color: black;">yakında eklenecek</p>`);
    }
}

async function fetchSirbistanPopupContent() {
    try {
        const response = await fetch('sirbistanSeferi.json');
        const data = await response.json();

        const firstPopupContent = `
            <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 20px;">${data.title}</h2>
            <video src="${data.video}" controls autoplay style="width: 80%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></video>
        `;

        const secondPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%; padding: 20px; box-sizing: border-box;">
                <div style="display: flex; flex-direction: row; width: 100%; margin-bottom: 20px;">
                    <div style="flex: 1; display: flex; justify-content: center; align-items: center; padding: 10px;">
                        <img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></img>
                    </div>
                    <div style="flex: 1; padding: 10px; text-align: left; font-size: 16px;">
                        <p><strong>Tarihi:</strong> ${data.details[0]}</p>
                        <p><strong>Sebebi:</strong> ${data.details[1]}</p>
                        <p><strong>Sonuçları:</strong> ${data.details[2]}</p>
                    </div>
                </div>
                <div style="flex: 1; padding: 10px; text-align: left; font-size: 16px; overflow-y: auto;">
                    <p>${data.description}</p>
                </div>
            </div>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, null, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error("yakında eklenecek", error);
        createPopup(`<p style="color: black;">yakında eklenecek</p>`);
    }
}

async function fetchMoraPopupContent() {
    try {
        const response = await fetch('moraSeferi.json');
        const data = await response.json();

        const firstPopupContent = `
            <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 20px;">${data.title}</h2>
            <video src="${data.video}" controls autoplay style="width: 80%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></video>
        `;

        const secondPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%; padding: 20px; box-sizing: border-box;">
                <div style="display: flex; flex-direction: row; width: 100%; margin-bottom: 20px;">
                    <div style="flex: 1; display: flex; justify-content: center; align-items: center; padding: 10px;">
                        <img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></img>
                    </div>
                    <div style="flex: 1; padding: 10px; text-align: left; font-size: 16px;">
                        <p><strong>Tarihi:</strong> ${data.details[0]}</p>
                        <p><strong>Sebebi:</strong> ${data.details[1]}</p>
                        <p><strong>Sonuçları:</strong> ${data.details[2]}</p>
                    </div>
                </div>
                <div style="flex: 1; padding: 10px; text-align: left; font-size: 16px; overflow-y: auto;">
                    <p>${data.description}</p>
                </div>
            </div>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, null, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error("yakında eklenecek", error);
        createPopup(`<p style="color: black;">yakında eklenecek</p>`);
    }
}

async function fetchBogdanPopupContent() {
    try {
        const response = await fetch('bogdanSeferi.json');
        const data = await response.json();

        const firstPopupContent = `
            <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 20px;">${data.title}</h2>
            <video src="${data.video}" controls autoplay style="width: 80%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></video>
        `;

        const secondPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%; padding: 20px; box-sizing: border-box;">
                <div style="display: flex; flex-direction: row; width: 100%; margin-bottom: 20px;">
                    <div style="flex: 1; display: flex; justify-content: center; align-items: center; padding: 10px;">
                        <img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></img>
                    </div>
                    <div style="flex: 1; padding: 10px; text-align: left; font-size: 16px;">
                        <p><strong>Tarihi:</strong> ${data.details[0]}</p>
                        <p><strong>Sebebi:</strong> ${data.details[1]}</p>
                        <p><strong>Sonuçları:</strong> ${data.details[2]}</p>
                    </div>
                </div>
                <div style="flex: 1; padding: 10px; text-align: left; font-size: 16px; overflow-y: auto;">
                    <p>${data.description}</p>
                </div>
            </div>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, null, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error("yakında eklenecek", error);
        createPopup(`<p style="color: black;">yakında eklenecek</p>`);
    }
}

async function fetchIyonPopupContent() {
    try {
        const response = await fetch('iyonAdalari.json');
        const data = await response.json();

        const firstPopupContent = `
            <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 20px;">${data.title}</h2>
            <video src="${data.video}" controls autoplay style="width: 80%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></video>
        `;

        const secondPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%; padding: 20px; box-sizing: border-box;">
                <div style="display: flex; flex-direction: row; width: 100%; margin-bottom: 20px;">
                    <div style="flex: 1; display: flex; justify-content: center; align-items: center; padding: 10px;">
                        <img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></img>
                    </div>
                    <div style="flex: 1; padding: 10px; text-align: left; font-size: 16px;">
                        <p><strong>Tarihi:</strong> ${data.details[0]}</p>
                        <p><strong>Sebebi:</strong> ${data.details[1]}</p>
                        <p><strong>Sonuçları:</strong> ${data.details[2]}</p>
                    </div>
                </div>
                <div style="flex: 1; padding: 10px; text-align: left; font-size: 16px; overflow-y: auto;">
                    <p>${data.description}</p>
                </div>
            </div>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, null, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error("yakında eklenecek", error);
        createPopup(`<p style="color: black;">yakında eklenecek</p>`);
    }
}

async function fetchAmasraPopupContent() {
    try {
        const response = await fetch('amasraninFethi.json');
        const data = await response.json();

        const firstPopupContent = `
            <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 20px;">${data.title}</h2>
            <video src="${data.video}" controls autoplay style="width: 80%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></video>
        `;

        const secondPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%; padding: 20px; box-sizing: border-box;">
                <div style="display: flex; flex-direction: row; width: 100%; margin-bottom: 20px;">
                    <div style="flex: 1; display: flex; justify-content: center; align-items: center; padding: 10px;">
                        <img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></img>
                    </div>
                    <div style="flex: 1; padding: 10px; text-align: left; font-size: 16px;">
                        <p><strong>Tarihi:</strong> ${data.details[0]}</p>
                        <p><strong>Sebebi:</strong> ${data.details[1]}</p>
                        <p><strong>Sonuçları:</strong> ${data.details[2]}</p>
                    </div>
                </div>
                <div style="flex: 1; padding: 10px; text-align: left; font-size: 16px; overflow-y: auto;">
                    <p>${data.description}</p>
                </div>
            </div>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, null, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error("yakında eklenecek", error);
        createPopup(`<p style="color: black;">yakında eklenecek</p>`);
    }
}

function createPopup(content, nextCallback = null, prevCallback = null) {
    const popup = document.createElement("div");
    Object.assign(popup.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "75%",
        height: "75%",
        backgroundColor: "white",
        padding: "20px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
        borderRadius: "12px",
        zIndex: "1000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    });

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "X";
    Object.assign(closeButton.style, {
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "none",
        border: "none",
        fontSize: "18px",
        cursor: "pointer",
        color: "red",
    });
    closeButton.onclick = () => document.body.removeChild(popup);

    const contentDiv = document.createElement("div");
    Object.assign(contentDiv.style, {
        flex: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto",
    });
    contentDiv.innerHTML = content;

    const buttonContainer = document.createElement("div");
    Object.assign(buttonContainer.style, {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
        width: "100%",
    });

    const navButtonsWrapper = document.createElement("div");
    Object.assign(navButtonsWrapper.style, {
        display: "flex",
        gap: "10px",
    });

    if (prevCallback) {
        const prevButton = document.createElement("button");
        prevButton.innerHTML = "Önceki";
        Object.assign(prevButton.style, {
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
        });
        prevButton.onclick = () => {
            document.body.removeChild(popup);
            prevCallback();
        };
        navButtonsWrapper.appendChild(prevButton);
    }

    if (nextCallback) {
        const nextButton = document.createElement("button");
        nextButton.innerHTML = "Sonraki";
        Object.assign(nextButton.style, {
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
        });
        nextButton.onclick = () => {
            document.body.removeChild(popup);
            nextCallback();
        };
        navButtonsWrapper.appendChild(nextButton);
    }

    buttonContainer.appendChild(navButtonsWrapper);

    if (!nextCallback) {
        const kapatButton = document.createElement("button");
        kapatButton.innerHTML = "Kapat";
        Object.assign(kapatButton.style, {
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
        });
        kapatButton.onclick = () => document.body.removeChild(popup);
        buttonContainer.appendChild(kapatButton);
    }

    popup.appendChild(closeButton);
    popup.appendChild(contentDiv);
    popup.appendChild(buttonContainer);

    document.body.appendChild(popup);
}

function createPersistentPopup() {
    let popup = document.getElementById("persistent-popup");
    if (!popup) {
        popup = document.createElement("div");
        popup.id = "persistent-popup";
        Object.assign(popup.style, {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "75%",
            height: "75%",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
            borderRadius: "12px",
            zIndex: "1000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        });
        document.body.appendChild(popup);
    }
}

function fitHighlightedBounds() {
    const bounds = L.latLngBounds([]);
    countriesLayer.eachLayer((layer) => {
        if (HIGHLIGHTED_COUNTRIES.includes(layer.feature.properties.SOV_A3)) {
            bounds.extend(layer.getBounds());
        }
    });
    if (!bounds.isValid()) return;
    
    map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 5
    });
}

remove.onclick = function (e) {
    highlightCountries = false;
    updateCountryStyles();
    marker1.remove();
    kirimMarker.remove();
    trabzonMarker.remove();
    sirbistanMarker.remove();
    moraMarker.remove();
    bogdanMarker.remove();
    iyonMarker.remove();
    amasraMarker.remove();
    map.setView([40, 42], 4);
};

const toggleButton = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

function fitBounds(bounds) {
    if (bounds) {
        map.fitBounds(bounds, {
            padding: [50, 50],
            maxZoom: 4
        });
    }
}

document.querySelectorAll('.ogm-button').forEach(button => {
    button.addEventListener('click', function() {
        const sultanCard = this.closest('.sultan-card');
        const sultanId = sultanCard.id;
        
        if (sultanId === 'yavuz-sultan-selim') {
    
        }

        if (sultanId === 'fatih-sultan-mehmet') {
            fetchFatihPopupContent();
        } else if (sultanId === 'kanuni-sultan-suleyman') {
            console.log('Kanuni Sultan Süleyman OGM content');
        }
    });
});

document.querySelectorAll('.harita-button').forEach(button => {
    button.addEventListener('click', function() {
        const sultanCard = this.closest('.sultan-card');
        const sultanId = sultanCard.id;
        
        if (sultanId === 'fatih-sultan-mehmet') {
            highlightCountries = true;
            updateCountryStylesFatih();
            marker1.addTo(map);
            kirimMarker.addTo(map);
            trabzonMarker.addTo(map);
            sirbistanMarker.addTo(map);
            moraMarker.addTo(map);
            bogdanMarker.addTo(map);
            iyonMarker.addTo(map);
            amasraMarker.addTo(map);
            sinopMarker.addTo(map);
            eflakMarker.addTo(map);
            otlukbeliMarker.addTo(map);
            fitHighlightedBounds();
        } else if (sultanId === 'yavuz-sultan-selim') {
            
        } else if (sultanId === 'kanuni-sultan-suleyman') {
            
        }
    });
});

function addMarkerClickListeners() {
    marker1.on('click', async function (e) {
        map.setView(e.latlng, 6);
        await fetchPopupContent();
    });
    kirimMarker.on('click', async function (e) {
        map.setView(e.latlng, 6);
        await fetchKirimPopupContent();
    });
    trabzonMarker.on('click', async function (e) {
        map.setView(e.latlng, 6);
        await fetchTrabzonPopupContent();
    });
    sirbistanMarker.on('click', async function (e) {
        map.setView(e.latlng, 6);
        await fetchSirbistanPopupContent();
    });
    moraMarker.on('click', async function (e) {
        map.setView(e.latlng, 6);
        await fetchMoraPopupContent();
    });
    bogdanMarker.on('click', async function (e) {
        map.setView(e.latlng, 6);
        await fetchBogdanPopupContent();
    });
    iyonMarker.on('click', async function (e) {
        map.setView(e.latlng, 6);
        await fetchIyonPopupContent();
    });
    amasraMarker.on('click', async function (e) {
        map.setView(e.latlng, 6);
        await fetchAmasraPopupContent();
    });
}

addMarkerClickListeners();

async function fetchYavuzPopupContent() {
    
    try {
        const response = await fetch('yavuzSultanSelim.json');
        const data = await response.json();

        const firstPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; height: 100%; padding: 20px; box-sizing: border-box; overflow-y: auto;">
                <h2 style="text-align: center; color: darkblue; font-size: 28px; margin-bottom: 25px;">${data.title}</h2>
                <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 25px; flex-wrap: wrap;">
                    <div style="text-align: center; padding: 8px; background-color: #f5f5f5; border-radius: 8px; min-width: 150px;">
                        <p style="margin: 0;"><strong>Doğum:</strong> ${data.birth}</p>
                    </div>
                    <div style="text-align: center; padding: 8px; background-color: #f5f5f5; border-radius: 8px; min-width: 150px;">
                        <p style="margin: 0;"><strong>Saltanat:</strong> ${data.reign}</p>
                    </div>
                    <div style="text-align: center; padding: 8px; background-color: #f5f5f5; border-radius: 8px; min-width: 150px;">
                        <p style="margin: 0;"><strong>Ölüm:</strong> ${data.death}</p>
                    </div>
                </div>
                <img src="${data.pages[0].image}" alt="${data.pages[0].title}" style="max-width: 70%; max-height: 250px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            </div>
        `;

        const secondPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; height: 100%; padding: 20px; box-sizing: border-box; overflow-y: auto;">
                <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 15px;">${data.pages[0].title}</h2>
                <div style="display: flex; flex-direction: row; width: 100%; gap: 15px; flex-wrap;">
                    <div style="flex: 1; min-width: 300px;">
                        <img src="${data.pages[0].image}" alt="${data.pages[0].title}" style="max-width: 100%; max-height: 250px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                    </div>
                    <div style="flex: 1; min-width: 300px; padding: 15px; background-color: #f5f5f5; border-radius: 8px; overflow-y: auto;">
                        <p style="font-size: 16px; line-height: 1.6; margin: 0;">${data.pages[0].content}</p>
                    </div>
                </div>
            </div>
        `;

        const thirdPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; height: 100%; padding: 20px; box-sizing: border-box; overflow-y: auto;">
                <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 25px;">${data.pages[1].title}</h2>
                <div style="display: flex; flex-direction: row; width: 100%; gap: 25px; flex-wrap: wrap; justify-content: center;">
                    <div style="flex: 1; min-width: 300px; display: flex; justify-content: center; align-items: flex-start;">
                        <img src="${data.pages[1].image}" alt="${data.pages[1].title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                    </div>
                    <div style="flex: 1; min-width: 300px; padding: 20px; background-color: #f5f5f5; border-radius: 8px; overflow-y: auto; display: flex; flex-direction: column; justify-content: flex-start;">
                        <p style="font-size: 16px; line-height: 1.8; margin: 0; text-align: justify;">${data.pages[1].content}</p>
                    </div>
                </div>
            </div>
        `;

        const fourthPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; height: 100%; padding: 20px; box-sizing: border-box; overflow-y: auto;">
                <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 15px;">${data.pages[2].title}</h2>
                <div style="display: flex; flex-direction: row; width: 100%; gap: 15px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 300px;">
                        <img src="${data.pages[2].image}" alt="${data.pages[2].title}" style="max-width: 100%; max-height: 250px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                    </div>
                    <div style="flex: 1; min-width: 300px; padding: 15px; background-color: #f5f5f5; border-radius: 8px; overflow-y: auto;">
                        <p style="font-size: 16px; line-height: 1.6; margin: 0;">${data.pages[2].content}</p>
                    </div>
                </div>
            </div>
        `;

        const fifthPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; height: 100%; padding: 20px; box-sizing: border-box; overflow-y: auto;">
                <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 15px;">${data.pages[3].title}</h2>
                <div style="display: flex; flex-direction: row; width: 100%; gap: 15px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 300px;">
                        <img src="${data.pages[3].image}" alt="${data.pages[3].title}" style="max-width: 100%; max-height: 250px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                    </div>
                    <div style="flex: 1; min-width: 300px; padding: 15px; background-color: #f5f5f5; border-radius: 8px; overflow-y: auto;">
                        <p style="font-size: 16px; line-height: 1.6; margin: 0;">${data.pages[3].content}</p>
                    </div>
                </div>
            </div>
        `;

        const sixthPopupContent = `
            <iframe src="https://ogmmateryal.eba.gov.tr/panel/panel/ZamanCizelgesiOnizle.aspx?alistirmaId=30443" style="width: 100%; height: 100%; border: none;"></iframe>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, () => {
                createPopup(thirdPopupContent, () => {
                    createPopup(fourthPopupContent, () => {
                        createPopup(fifthPopupContent, () => {
                            createPopup(sixthPopupContent, null, () => createPopup(fifthPopupContent, () => createPopup(fourthPopupContent, () => createPopup(thirdPopupContent, () => createPopup(secondPopupContent, () => createPopup(firstPopupContent))))));
                        }, () => createPopup(fourthPopupContent, () => createPopup(thirdPopupContent, () => createPopup(secondPopupContent, () => createPopup(firstPopupContent)))));
                    }, () => createPopup(thirdPopupContent, () => createPopup(secondPopupContent, () => createPopup(firstPopupContent))));
                }, () => createPopup(secondPopupContent, () => createPopup(firstPopupContent)));
            }, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error("yakında eklenecek", error);
        createPopup(`<p style="color: black;">yakında eklenecek</p>`);
    }
}

async function fetchPopupContent() {
    try {
        const response = await fetch('istanbulunFethi.json');
        const data = await response.json();

        const firstPopupContent = `
            <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 20px;">${data.title}</h2>
            <video src="${data.video}" controls autoplay style="width: 80%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></video>
        `;

        const secondPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%; padding: 20px; box-sizing: border-box;">
                <div style="display: flex; flex-direction: row; width: 100%; margin-bottom: 20px;">
                    <div style="flex: 1; display: flex; justify-content: center; align-items: center; padding: 10px; max-width: 200px;">
                        <img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 200px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></img>
                    </div>
                    <div style="flex: 2; padding: 10px; text-align: left; font-size: 16px; overflow-y: auto;">
                        <p><strong>Tarihi:</strong> ${data.details[0]}</p>
                        <p><strong>Sebebi:</strong> ${data.details[1]}</p>
                        <p><strong>Sonuçları:</strong> ${data.details[2]}</p>
                        <p>${data.description}</p>
                    </div>
                </div>
            </div>
        `;

        const thirdPopupContent = `
            <iframe src="https://ogmmateryal.eba.gov.tr/panel/panel/Eslestir2Onizle.aspx?alistirmaId=32847" style="width: 100%; height: 100%; border: none;"></iframe>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, () => {
                createPopup(thirdPopupContent, null, () => createPopup(secondPopupContent, () => createPopup(firstPopupContent)));
            }, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error("yakında eklenecek", error);
        createPopup(`<p style="color: black;">yakında eklenecek</p>`);
    }
}

function showFatihMarkers() {
    Object.values(this.markers).forEach(marker => marker.addTo(map));
    marker1.addTo(map);
    kirimMarker.addTo(map);
    trabzonMarker.addTo(map);
    sirbistanMarker.addTo(map);
    moraMarker.addTo(map);
    bogdanMarker.addTo(map);
    iyonMarker.addTo(map);
    amasraMarker.addTo(map);
}

sinopMarker.remove();

async function fetchSinopPopupContent() {
    try {
        const response = await fetch('sinopunalinisi.json');
        const data = await response.json();

        const firstPopupContent = `
            <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 20px;">${data.title}</h2>
            <video src="${data.video}" controls autoplay style="width: 80%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></video>
        `;

        const secondPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%; padding: 20px; box-sizing: border-box;">
                <div style="display: flex; flex-direction: row; width: 100%; margin-bottom: 20px;">
                    <div style="flex: 1; display: flex; justify-content: center; align-items: center; padding: 10px; max-width: 200px;">
                        <img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></img>
                    </div>
                    <div style="flex: 2; padding: 10px; text-align: left; font-size: 16px; overflow-y: auto;">
                        <p><strong>Tarihi:</strong> ${data.details[0]}</p>
                        <p><strong>Sebebi:</strong> ${data.details[1]}</p>
                        <p><strong>Sonuçları:</strong> ${data.details[2]}</p>
                        <p>${data.description}</p>
                    </div>
                </div>
            </div>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, null, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error('Error fetching Sinop popup content:', error);
        createPopup(`<p style="color: black;">yakında eklenecek</p>`);
    }
}


sinopMarker.on('click', fetchSinopPopupContent);


eflakMarker.remove();


async function fetchEflakPopupContent() {
    try {
        const response = await fetch('eflakinfethi.json');
        const data = await response.json();

        const firstPopupContent = `
            <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 20px;">${data.title}</h2>
            <video src="${data.video}" controls autoplay style="width: 80%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></video>
        `;

        const secondPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%; padding: 20px; box-sizing: border-box;">
                <div style="display: flex; flex-direction: row; width: 100%; margin-bottom: 20px;">
                    <div style="flex: 1; display: flex; justify-content: center; align-items: center; padding: 10px; max-width: 200px;">
                        <img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></img>
                    </div>
                    <div style="flex: 2; padding: 10px; text-align: left; font-size: 16px; overflow-y: auto;">
                        <p><strong>Tarihi:</strong> ${data.details[0]}</p>
                        <p><strong>Sebebi:</strong> ${data.details[1]}</p>
                        <p><strong>Sonuçları:</strong> ${data.details[2]}</p>
                        <p>${data.description}</p>
                    </div>
                </div>
            </div>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, null, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error('Error fetching Eflak popup content:', error);
        createPopup(`<p style="color: black;">yakında eklenecek</p>`);
    }
}

eflakMarker.on('click', fetchEflakPopupContent);

otlukbeliMarker.remove();

async function fetchOtlukbeliPopupContent() {
    try {
        const response = await fetch('otlukbeliSavasi.json');
        const data = await response.json();

        const firstPopupContent = `
            <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 20px;">${data.title}</h2>
            <video src="${data.video}" controls autoplay style="width: 80%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></video>
        `;

        const secondPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%; padding: 20px; box-sizing: border-box;">
                <div style="display: flex; flex-direction: row; width: 100%; margin-bottom: 20px;">
                    <div style="flex: 1; display: flex; justify-content: center; align-items: center; padding: 10px; max-width: 200px;">
                        <img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></img>
                    </div>
                    <div style="flex: 2; padding: 10px; text-align: left; font-size: 16px; overflow-y: auto;">
                        <p><strong>Tarihi:</strong> ${data.details[0]}</p>
                        <p><strong>Sebebi:</strong> ${data.details[1]}</p>
                        <p><strong>Sonuçları:</strong> ${data.details[2]}</p>
                        <p>${data.description}</p>
                    </div>
                </div>
            </div>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, null, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error('Error fetching Otlukbeli popup content:', error);
        createPopup(`<p style="color: black;">yakında eklenecek</p>`);
    }
}

otlukbeliMarker.on('click', fetchOtlukbeliPopupContent);

