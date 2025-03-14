document.addEventListener('DOMContentLoaded', function() {
    const chores = [
        "Lunes Almuerzo",
        "Lunes Cena",
        "Lunes ver si hay que comprar cosas",
        "Lunes Piedras Robin",
        "Lunes Basura",
        "Lunes Platos Almuerzo",
        "Lunes Platos Cena",
        "Lunes Ordenar Living",
        "Lunes y Martes Chia Puddings",

        "Martes Almuerzo",
        "Martes Cena",
        "Martes ver si hay que comprar cosas",
        "Martes Piedras Robin",
        "Martes Basura",
        "Martes Platos Almuerzo",
        "Martes Platos Cena",
        "Martes Ordenar Living",

        "Miercoles Almuerzo",
        "Miercoles Cena",
        "Miercoles ver si hay que comprar cosas",
        "Miercoles Piedras Robin",
        "Miercoles Basura",
        "Miercoles Platos Almuerzo",
        "Miercoles Platos Cena",
        "Miercoles Ordenar Living",
        "Miercoles y Jueves Chia Puddings",

        "Jueves Almuerzo",
        "Jueves Cena",
        "Jueves ver si hay que comprar cosas",
        "Jueves Piedras Robin",
        "Jueves Basura",
        "Jueves Platos Almuerzo",
        "Jueves Platos Cena",
        "Jueves Ordenar Living",

        "Viernes Almuerzo",
        "Viernes Cena",
        "Viernes ver si hay que comprar cosas",
        "Viernes Piedras Robin",
        "Viernes Basura",
        "Viernes Platos Almuerzo",
        "Viernes Platos Cena",
        "Viernes Ordenar Living",
        "Viernes y Sabado Chia Puddings",

        "Limpiar baño"
    ];

    const wendyChoresList = document.getElementById('wendy-chores-list');
    const damianChoresList = document.getElementById('damian-chores-list');
    const sortButton = document.getElementById('sort-button');

    function alternateBackgroundColors() {
        const bgColors = [
            ['#FF5733', '#33A8FF'],
            ['#FFC300', '#8A2BE2'],
            ['#2ECC71', '#E74C3C'],
            ['#9B59B6', '#F39C12']
        ];

        const titleColors = [
            '#FFD700',
            '#00FFFF',
            '#FF69B4',
            '#ADFF2F'
        ];

        const boxColors = [
            ['#483D8B', '#2F4F4F'], // DarkSlateBlue & DarkSlateGray
            ['#800000', '#006400'], // Maroon & DarkGreen
            ['#A0522D', '#4682B4'], // Sienna & SteelBlue
            ['#556B2F', '#8B008B']  // DarkOliveGreen & DarkMagenta
        ];

        const buttonColors = [
            '#800080',
            '#008080',
            '#FFA500',
            '#00FF00'
        ];

        const randomBgColors = bgColors[Math.floor(Math.random() * bgColors.length)];
        const randomTitleColor = titleColors[Math.floor(Math.random() * titleColors.length)];
        const randomButtonColor = buttonColors[Math.floor(Math.random() * buttonColors.length)];
        const randomBoxColors = boxColors[Math.floor(Math.random() * boxColors.length)];

        const color1 = randomBgColors[0];
        const color2 = randomBgColors[1];

        document.body.style.background = `linear-gradient(90deg, ${color1} 50%, ${color2} 50%)`;
        document.querySelector('h1').style.backgroundColor = randomTitleColor;
        document.getElementById('sort-button').style.backgroundColor = randomButtonColor;

        const darkerColor1 = darkenColor(color1, 0.6);
        const darkerColor2 = darkenColor(color2, 0.6);

        document.getElementById('wendy-chores').style.color = darkerColor1;
        document.getElementById('damian-chores').style.color = darkerColor2;

        document.getElementById('wendy-chores').style.backgroundColor = randomBoxColors[0];
        document.getElementById('damian-chores').style.backgroundColor = randomBoxColors[1];
    }

    function darkenColor(color, factor) {
        let hex = color.replace('#', '');
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        r = Math.round(r * factor);
        g = Math.round(g * factor);
        b = Math.round(b * factor);

        r = (r < 0) ? 0 : (r > 255) ? 255 : r;
        g = (g < 0) ? 0 : (g > 255) ? 255 : g;
        b = (b < 0) ? 0 : (b > 255) ? 255 : b;

        let rr = ("0" + r.toString(16)).slice(-2);
        let gg = ("0" + g.toString(16)).slice(-2);
        let bb = ("0" + b.toString(16)).slice(-2);

        return "#" + rr + gg + bb;
    }

 sortButton.addEventListener('click', function() {
    // ... your existing code ...

    // Send data to Make
    fetch('https://hook.us2.make.com/wbd5rg7e1mhvseoy83v4oikn6bmuhmli', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(assignedChores)
    });
});
function displayChores(assignedChores) {
    wendyChoresList.innerHTML = '';
    damianChoresList.innerHTML = '';

    // Sort chores by day of the week
    const sortedWendyChores = sortChoresByDay(assignedChores.wendyChores);
    const sortedDamianChores = sortChoresByDay(assignedChores.damianChores);

    sortedWendyChores.forEach(chore => {
        createChoreItem(chore, wendyChoresList);
    });

    sortedDamianChores.forEach(chore => {
        createChoreItem(chore, damianChoresList);
    });

    updateProgressBars(assignedChores);
}

function sortChoresByDay(chores) {
    const dayOrder = {
        "Lunes": 1,
        "Martes": 2,
        "Miercoles": 3,
        "Jueves": 4,
        "Viernes": 5
    };

    return chores.sort((a, b) => {
        const dayA = a.split(" ")[0]; // Get the day (e.g., "Lunes")
        const dayB = b.split(" ")[0];

        return (dayOrder[dayA] || 6) - (dayOrder[dayB] || 6); // Use 6 for chores without a day
    });
}

    function createChoreItem(chore, list) {
        const listItem = document.createElement('li');
        listItem.textContent = chore;
        listItem.dataset.chore = chore;

        const completedChores = JSON.parse(localStorage.getItem('completedChores')) || [];
        if (completedChores.includes(chore)) {
            listItem.classList.add('completed');
        }

        listItem.addEventListener('click', toggleChoreStatus);
        list.appendChild(listItem);
    }

    function toggleChoreStatus(event) {
        const listItem = event.target;
        const chore = listItem.dataset.chore;

        let completedChores = JSON.parse(localStorage.getItem('completedChores')) || [];

        if (listItem.classList.contains('completed')) {
            listItem.classList.remove('completed');
            completedChores = completedChores.filter(c => c !== chore);
        } else {
            listItem.classList.add('completed');
            completedChores.push(chore);
        }

        localStorage.setItem('completedChores', JSON.stringify(completedChores));

        const assignedChores = {
            wendyChores: Array.from(wendyChoresList.children).map(li => li.dataset.chore),
            damianChores: Array.from(damianChoresList.children).map(li => li.dataset.chore)
        };
        updateProgressBars(assignedChores);
    }

    function assignChores(chores) {
        const wendyChores = [];
        const damianChores = [];
        const shuffledChores = [...chores].sort(() => 0.5 - Math.random());

        shuffledChores.forEach((chore, index) => {
            if (chores.length % 2 === 0) { //even number of chores, distribute evenly
                if (index % 2 === 0) {
                    wendyChores.push(chore);
                } else {
                    damianChores.push(chore);
                }
            }else{ //odd number of chores, give extra to Damian
                if (index % 2 === 0) {
                    damianChores.push(chore);
                } else {
                    wendyChores.push(chore);
                }
            }
        });

        if (chores.length % 2 !== 0){
            damianChores.sort();
            wendyChores.sort();
        }

        return { wendyChores, damianChores };
    }

    function updateProgressBars(assignedChores) {
        const wendyCompleted = assignedChores.wendyChores.filter(chore => {
            return JSON.parse(localStorage.getItem('completedChores'))?.includes(chore);
        }).length;
        const damianCompleted = assignedChores.damianChores.filter(chore => {
            return JSON.parse(localStorage.getItem('completedChores'))?.includes(chore);
        }).length;

        const wendyTotal = assignedChores.wendyChores.length;
        const damianTotal = assignedChores.damianChores.length;

        const wendyPercent = wendyTotal > 0 ? (wendyCompleted / wendyTotal) * 100 : 0;
        const damianPercent = damianTotal > 0 ? (damianCompleted / damianTotal) * 100 : 0;

        document.getElementById('wendy-progress').style.width = `${wendyPercent}%`;
        document.getElementById('damian-progress').style.width = `${damianPercent}%`;
    }

    alternateBackgroundColors();
    document.body.addEventListener('click', alternateBackgroundColors);
});
