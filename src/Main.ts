import MyGame from './MyGame';

// to play sound 
// need to interact with page ... so button to load
// if no sounds... can use the other load methods
window.onload = () => {

    let button =  document.createElement('button');  
    button.innerText  = "Click to load";
    button.onclick = () => {
        document.body.removeChild(button);
        let g = new MyGame();
    }

    document.body.appendChild(button);  
}


/*
// no sounds load
window.onload = () => {
        let g = new MyGame();
}

*/