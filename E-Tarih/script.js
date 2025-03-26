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
const kirimMarker = L.marker([45.3453, 36.5728]); // Crimea coordinates
const trabzonMarker = L.marker([41.0027, 39.7168]); // Trabzon coordinates
const sirbistanMarker = L.marker([44.8125, 20.4612]); // First Serbia Campaign coordinates (Belgrade)
const sirbistanMarker2 = L.marker([43.8564, 20.3703]); // Second Serbia Campaign coordinates (Kragujevac)
const moraMarker = L.marker([37.9838, 23.7275]); // Morea coordinates (Athens)
const bogdanMarker = L.marker([47.0243, 28.8323]); // Moldavia coordinates (Chișinău)


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

async function fetchPopupContent() {
    try {
        const response = await fetch('yavuzSultanSelim.json');
        const data = await response.json();

        const firstPopupContent = `
            <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 20px;">${data.title}</h2>
            <video src="${data.video}" controls autoplay style="width: 80%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></video>
        `;

        const secondPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%; padding: 20px; box-sizing: border-box;">
                <div style="display: flex; flex-direction: row; width: 100%; margin-bottom: 20px;">
                    <div style="flex: 1; display: flex; justify-content: center; align-items: center; padding: 10px;">
                        <img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
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

        const thirdPopupContent = `
            <iframe src="https://ogmmateryal.eba.gov.tr/panel/panel/CozumluSoruOnizle.aspx?alistirmaId=32825" style="width: 100%; height: 100%; border: none;"></iframe>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, () => {
                createPopup(thirdPopupContent, null, () => createPopup(secondPopupContent, () => createPopup(firstPopupContent)));
            }, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error("JSON verisi alınırken hata oluştu:", error);
        createPopup(`<p style="color: red;">İçerik yüklenemedi.</p>`);
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
                    <div style="flex: 1; display: flex; justify-content: center; align-items: center; padding: 10px;">
                        <img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
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

        const thirdPopupContent = `
            <iframe src="https://ogmmateryal.eba.gov.tr/panel/panel/CozumluSoruOnizle.aspx?alistirmaId=32825" style="width: 100%; height: 100%; border: none;"></iframe>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, () => {
                createPopup(thirdPopupContent, null, () => createPopup(secondPopupContent, () => createPopup(firstPopupContent)));
            }, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error("JSON verisi alınırken hata oluştu:", error);
        createPopup(`<p style="color: red;">İçerik yüklenemedi.</p>`);
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
                        <img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
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

        const thirdPopupContent = `
            <iframe src="https://ogmmateryal.eba.gov.tr/panel/panel/CozumluSoruOnizle.aspx?alistirmaId=32825" style="width: 100%; height: 100%; border: none;"></iframe>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, () => {
                createPopup(thirdPopupContent, null, () => createPopup(secondPopupContent, () => createPopup(firstPopupContent)));
            }, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error("JSON verisi alınırken hata oluştu:", error);
        createPopup(`<p style="color: red;">İçerik yüklenemedi.</p>`);
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
                        <img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
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

        const thirdPopupContent = `
            <iframe src="https://ogmmateryal.eba.gov.tr/panel/panel/CozumluSoruOnizle.aspx?alistirmaId=32825" style="width: 100%; height: 100%; border: none;"></iframe>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, () => {
                createPopup(thirdPopupContent, null, () => createPopup(secondPopupContent, () => createPopup(firstPopupContent)));
            }, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error("JSON verisi alınırken hata oluştu:", error);
        createPopup(`<p style="color: red;">İçerik yüklenemedi.</p>`);
    }
}

async function fetchSirbistan2PopupContent() {
    try {
        const response = await fetch('sirbistanSeferi2.json');
        const data = await response.json();

        const firstPopupContent = `
            <h2 style="text-align: center; color: darkblue; font-size: 24px; margin-bottom: 20px;">${data.title}</h2>
            <video src="${data.video}" controls autoplay style="width: 80%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></video>
        `;

        const secondPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%; padding: 20px; box-sizing: border-box;">
                <div style="display: flex; flex-direction: row; width: 100%; margin-bottom: 20px;">
                    <div style="flex: 1; display: flex; justify-content: center; align-items: center; padding: 10px;">
                        <img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
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

        const thirdPopupContent = `
            <iframe src="https://ogmmateryal.eba.gov.tr/panel/panel/CozumluSoruOnizle.aspx?alistirmaId=32825" style="width: 100%; height: 100%; border: none;"></iframe>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, () => {
                createPopup(thirdPopupContent, null, () => createPopup(secondPopupContent, () => createPopup(firstPopupContent)));
            }, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error("JSON verisi alınırken hata oluştu:", error);
        createPopup(`<p style="color: red;">İçerik yüklenemedi.</p>`);
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
                        <img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
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

        const thirdPopupContent = `
            <iframe src="https://ogmmateryal.eba.gov.tr/panel/panel/CozumluSoruOnizle.aspx?alistirmaId=32825" style="width: 100%; height: 100%; border: none;"></iframe>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, () => {
                createPopup(thirdPopupContent, null, () => createPopup(secondPopupContent, () => createPopup(firstPopupContent)));
            }, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error("JSON verisi alınırken hata oluştu:", error);
        createPopup(`<p style="color: red;">İçerik yüklenemedi.</p>`);
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
                        <img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
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

        const thirdPopupContent = `
            <iframe src="https://ogmmateryal.eba.gov.tr/panel/panel/CozumluSoruOnizle.aspx?alistirmaId=32825" style="width: 100%; height: 100%; border: none;"></iframe>
        `;

        createPopup(firstPopupContent, () => {
            createPopup(secondPopupContent, () => {
                createPopup(thirdPopupContent, null, () => createPopup(secondPopupContent, () => createPopup(firstPopupContent)));
            }, () => createPopup(firstPopupContent));
        });
    } catch (error) {
        console.error("JSON verisi alınırken hata oluştu:", error);
        createPopup(`<p style="color: red;">İçerik yüklenemedi.</p>`);
    }
}

async function fetchFatihPopupContent() {
    try {
        const response = await fetch('fatihSultanMehmet.json');
        const data = await response.json();

        const firstPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; height: 100%; padding: 20px; box-sizing: border-box;">
                <h2 style="text-align: center; color: darkblue; font-size: 32px; margin-bottom: 20px;">${data.title}</h2>
                <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 20px;">
                    <div style="text-align: center; padding: 10px; background-color: #f5f5f5; border-radius: 8px;">
                        <p><strong>Doğum:</strong> ${data.birth}</p>
                    </div>
                    <div style="text-align: center; padding: 10px; background-color: #f5f5f5; border-radius: 8px;">
                        <p><strong>Ölüm:</strong> ${data.death}</p>
                    </div>
                </div>
                <div style="text-align: center; padding: 10px; background-color: #f5f5f5; border-radius: 8px; margin-bottom: 20px;">
                    <p><strong>Saltanat:</strong> ${data.reign}</p>
                </div>
                <img src="${data.pages[0].image}" alt="${data.pages[0].title}" style="max-width: 80%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            </div>
        `;

        const secondPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; height: 100%; padding: 20px; box-sizing: border-box;">
                <h2 style="text-align: center; color: darkblue; font-size: 28px; margin-bottom: 20px;">${data.pages[0].title}</h2>
                <div style="display: flex; flex-direction: row; width: 100%; gap: 20px;">
                    <div style="flex: 1;">
                        <img src="${data.pages[0].image}" alt="${data.pages[0].title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                    </div>
                    <div style="flex: 1; padding: 20px; background-color: #f5f5f5; border-radius: 8px; overflow-y: auto;">
                        <p style="font-size: 16px; line-height: 1.6;">${data.pages[0].content}</p>
                    </div>
                </div>
            </div>
        `;

        const thirdPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; height: 100%; padding: 20px; box-sizing: border-box;">
                <h2 style="text-align: center; color: darkblue; font-size: 28px; margin-bottom: 20px;">${data.pages[1].title}</h2>
                <div style="display: flex; flex-direction: row; width: 100%; gap: 20px;">
                    <div style="flex: 1;">
                        <img src="${data.pages[1].image}" alt="${data.pages[1].title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                    </div>
                    <div style="flex: 1; padding: 20px; background-color: #f5f5f5; border-radius: 8px; overflow-y: auto;">
                        <p style="font-size: 16px; line-height: 1.6;">${data.pages[1].content}</p>
                    </div>
                </div>
            </div>
        `;

        const fourthPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; height: 100%; padding: 20px; box-sizing: border-box;">
                <h2 style="text-align: center; color: darkblue; font-size: 28px; margin-bottom: 20px;">${data.pages[2].title}</h2>
                <div style="display: flex; flex-direction: row; width: 100%; gap: 20px;">
                    <div style="flex: 1;">
                        <img src="${data.pages[2].image}" alt="${data.pages[2].title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                    </div>
                    <div style="flex: 1; padding: 20px; background-color: #f5f5f5; border-radius: 8px; overflow-y: auto;">
                        <p style="font-size: 16px; line-height: 1.6;">${data.pages[2].content}</p>
                    </div>
                </div>
            </div>
        `;

        const fifthPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: center; height: 100%; padding: 20px; box-sizing: border-box;">
                <h2 style="text-align: center; color: darkblue; font-size: 28px; margin-bottom: 20px;">${data.pages[3].title}</h2>
                <div style="display: flex; flex-direction: row; width: 100%; gap: 20px;">
                    <div style="flex: 1;">
                        <img src="${data.pages[3].image}" alt="${data.pages[3].title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                    </div>
                    <div style="flex: 1; padding: 20px; background-color: #f5f5f5; border-radius: 8px; overflow-y: auto;">
                        <p style="font-size: 16px; line-height: 1.6;">${data.pages[3].content}</p>
                    </div>
                </div>
            </div>
        `;

        const sixthPopupContent = `
            <iframe src="https://ogmmateryal.eba.gov.tr/panel/panel/CozumluSoruOnizle.aspx?alistirmaId=32825" style="width: 100%; height: 100%; border: none;"></iframe>
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
        console.error("JSON verisi alınırken hata oluştu:", error);
        createPopup(`<p style="color: red;">İçerik yüklenemedi.</p>`);
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

yavuzSultanSelim.onclick = function (e) {
    resetHighlight(e);
    highlightCountries = true;
    updateCountryStyles();
    marker1.remove();
    fitHighlightedBounds();
};

fatihSultanMemet.onclick = function (e) {
    resetHighlight(e);
    highlightCountries = true;
    updateCountryStylesFatih();
    marker1.addTo(map);
    kirimMarker.addTo(map); // Add Crimea marker
    trabzonMarker.addTo(map); // Add Trabzon marker
    sirbistanMarker.addTo(map); // Add First Serbia marker
    sirbistanMarker2.addTo(map); // Add Second Serbia marker
    moraMarker.addTo(map); // Add Morea marker
    bogdanMarker.addTo(map); // Add Moldavia marker
    fitHighlightedBounds();
    
    // Show Fatih Sultan Mehmet's life popup
    fetchFatihPopupContent();
    
    // Set up marker click events
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
    sirbistanMarker2.on('click', async function (e) {
        map.setView(e.latlng, 6);
        await fetchSirbistan2PopupContent();
    });
    moraMarker.on('click', async function (e) {
        map.setView(e.latlng, 6);
        await fetchMoraPopupContent();
    });
    bogdanMarker.on('click', async function (e) {
        map.setView(e.latlng, 6);
        await fetchBogdanPopupContent();
    });
};

remove.onclick = function (e) {
    highlightCountries = false;
    updateCountryStyles();
    marker1.remove();
    kirimMarker.remove(); // Remove Crimea marker
    trabzonMarker.remove(); // Remove Trabzon marker
    sirbistanMarker.remove(); // Remove First Serbia marker
    sirbistanMarker2.remove(); // Remove Second Serbia marker
    moraMarker.remove(); // Remove Morea marker
    bogdanMarker.remove(); // Remove Moldavia marker
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