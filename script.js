document.addEventListener('DOMContentLoaded', function() {
    const chores = [
        "Clean Kitchen",
        "Take out Trash",
        "Vacuum Living Room",
        "Clean Bathroom",
        "Wash Dishes",
        "Mop Floors"
    ];

    const wendyChoresList = document.getElementById('wendy-chores-list');
    const damianChoresList = document.getElementById('damian-chores-list');
    const sortButton = document.getElementById('sort-button');

    function alternateBackgroundColors() {
        const bgColors = [
            ['#FF5733', '#33A8FF'], // Orange-Red & Light Blue
            ['#FFC300', '#8A2BE2'], // Yellow & Purple
            ['#2ECC71', '#E74C3C'], // Green & Red
            ['#9B59B6', '#F39C12']  // Purple & Orange
        ];

        const titleColors = [
            '#FFD700', // Gold
            '#00FFFF', // Cyan
            '#FF69B4', // Hot Pink
            '#ADFF2F'  // GreenYellow
        ];

        const buttonColors = [
            '#800080', // Purple
            '#008080', // Teal
            '#FFA500', // Orange
            '#00FF00'  // Lime
        ];

        const randomBgColors = bgColors[Math.floor(Math.random() * bgColors.length)];
        const randomTitleColor = titleColors[Math.floor(Math.random() * titleColors.length)];
        const randomButtonColor = buttonColors[Math.floor(Math.random() * buttonColors.length)];

        const color1 = randomBgColors[0];
        const color2 = randomBgColors[1];

        document.body.style.background = `linear-gradient(90deg, ${color1} 50%, ${color2} 50%)`;

        // Update title box background color
        document.querySelector('h1').style.backgroundColor = randomTitleColor;

        // Update button background color
        document.getElementById('sort-button').style.backgroundColor = randomButtonColor;

        // Darken the colors for text
        const darkerColor1 = darkenColor(color1, 0.6);
        const darkerColor2 = darkenColor(color2, 0.6);

        document.getElementById('wendy-chores').style.color = darkerColor1;
        document.getElementById('damian-chores').style.color = darkerColor2;
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

    // Call alternateBackgroundColors() once to set initial colors
    alternateBackgroundColors();

    // Add event listener for clicks on the entire document body
    document.body.addEventListener('click', alternateBackgroundColors);

    sortButton.addEventListener('click', function() {
        const assignedChores = assignChores(chores);
        wendyChoresList.innerHTML = '';
        damianChoresList.innerHTML = '';

        assignedChores.wendyChores.forEach(chore => {
            const listItem = document.createElement('li');
            listItem.textContent = chore;
            wendyChoresList.appendChild(listItem);
        });

        assignedChores.damianChores.forEach(chore => {
            const listItem = document.createElement('li');
            listItem.textContent = chore;
            damianChoresList.appendChild(listItem);
        });
    });

    function assignChores(chores) {
        const wendyChores = [];
        const damianChores = [];
        const shuffledChores = [...chores].sort(() => 0.5 - Math.random());

        shuffledChores.forEach((chore, index) => {
            if (index % 2 === 0) {
                wendyChores.push(chore);
            } else {
                damianChores.push(chore);
            }
        });

        return { wendyChores, damianChores };
    }
});