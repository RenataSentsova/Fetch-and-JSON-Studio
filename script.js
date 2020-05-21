document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById("container");

    const createCardAstronauts = (firstName, lastName, hoursInSpace, active, skills, picture) => {
        let skillsAsString = skills.join(', ');
        let css = "";
        if (active == true) css = "active"; 
        const card = document.createElement('div');
        card.className = "astronaut";
        card.innerHTML = `<div class="bio">
                            <h3>${firstName} ${lastName}</h3>
                            <ul>
                                <li>Hours in space: ${hoursInSpace}</li>
                                <li class=${css}>Active: ${active}</li>
                                <li>Skills: ${skillsAsString}</li>
                            </ul>
                        </div>
                        <img class="avatar" src=${picture}>`;
        return card;
    };

    const renderCard = (astronauts) => {
        container.textContent='';
        container.innerHTML += `<div>
                                    <h2> Count of astronauts: ${astronauts.length}</h2>
                                </div>`;        
        if (astronauts.length) {
            astronauts.forEach(({ firstName, lastName, hoursInSpace, active, skills, picture }) => {
                container.append(createCardAstronauts(firstName, lastName, hoursInSpace, active, skills, picture));
            });    
        }

    };

    const getData = (handler, filter) => {
        fetch("https://handlers.education.launchcode.org/static/astronauts.json")
            .then(response => response.json())
            .then(filter)
            .then(handler);
    };

    const sortByHours = (astronauts) => {
        // return astronauts.sort(function (a, b) {
        //      return a.hoursInSpace < b.hoursInSpace;
        // });
        return astronauts.sort((a,b) => a.hoursInSpace - b.hoursInSpace).reverse();
    };

    getData(renderCard, sortByHours);
});