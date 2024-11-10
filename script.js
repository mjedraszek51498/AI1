let map = L.map('map').setView([51.505, -0.09], 18);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);

document.getElementById("saveButton").addEventListener("click", function() {
    leafletImage(map, function (err, canvas) {
        split(canvas);
    });
});

document.getElementById("getLocation").addEventListener("click", function(event) {
    if (!navigator.geolocation) {
        console.log("No geolocation.");
    }

    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        map.setView([lat, lon]);
    }, positionError => {
        console.error(positionError);
    });
});

function split(canvas) {
    const pieceSizeX = canvas.width / 4;
    const pieceSizeY = canvas.height / 4;
    const pieces = [];
    for (let i = 0; i < 16; i++) {
        const x = (i % 4) * pieceSizeX;
        const y = Math.floor(i / 4) * pieceSizeY;
        const pieceCanvas = document.createElement("canvas");
        pieceCanvas.width = pieceSizeX;
        pieceCanvas.height = pieceSizeY;
        const context = pieceCanvas.getContext('2d');
        context.drawImage(canvas, x, y, pieceSizeX, pieceSizeY, 0, 0, pieceSizeX, pieceSizeY);

        const dataURL = pieceCanvas.toDataURL();
        pieces.push(dataURL);
    }

    shuffle(pieces);

    pieces.forEach((dataURL, i) => {
        const draggableDiv = document.getElementById(`draggable-item-${i + 1}`);
        draggableDiv.style.backgroundImage = `url(${dataURL})`;
        draggableDiv.style.width = `${pieceSizeX}px`;
        draggableDiv.style.height = `${pieceSizeY}px`;

        const targetDiv = document.getElementById(`target-${i + 1}`);
        targetDiv.style.width = `${pieceSizeX}px`;
        targetDiv.style.height = `${pieceSizeY}px`;
    });
}

let items = document.querySelectorAll('.item');
items.forEach(item => {
    item.addEventListener("dragstart", event => {
        item.style.border = "5px dashed #D8D8FF";
        event.dataTransfer.setData("text", item.id);
    });

    item.addEventListener("dragend", event => {
        item.style.border = "none";
    });
});

let targets = document.querySelectorAll(".target");
targets.forEach(target => {
    target.addEventListener("dragenter", event => {
        target.style.border = "1px solid purple";
    });
    target.addEventListener("dragleave", event => {
        target.style.border = "1px solid black";
    });
    target.addEventListener("dragover", event => {
        event.preventDefault();
    });
    target.addEventListener("drop", event => {
        let myElement = document.querySelector("#" + event.dataTransfer.getData('text'));
        target.appendChild(myElement);
        target.style.border = "none";


        setTimeout(checkPositions, 50);
    }, false);
});

function shuffle() {
    const parentContainer = document.querySelector('.cuts'); // Assuming your divs are inside a container with class "cuts"
    const divs = Array.from(parentContainer.children);  // Get all the divs inside the container

    // Shuffle the divs
    for (let i = divs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [divs[i], divs[j]] = [divs[j], divs[i]];  // Swap the divs
    }

    // Reattach the shuffled divs back to the parent container
    divs.forEach(div => parentContainer.appendChild(div));
}

function checkPositions() {
    let correctCounter = 0;
    for (let i = 0; i < 16; i++) {
        const targetDiv = document.getElementById(`target-${i + 1}`);
        const child = targetDiv.firstChild;
        if (child && child.id === `draggable-item-${i + 1}`) {
            correctCounter++;
        }

    }
    console.log(correctCounter);

    if (correctCounter === 16) {
        alert("All pieces are in the correct positions!");
    }
}
