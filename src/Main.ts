import MyGame from './MyGame';

window.onload = () => {

    let ButtonStart =<HTMLButtonElement>document.createElement('button');
    ButtonStart.id = "startBtn";
    ButtonStart.textContent = "Start";
    ButtonStart.onclick = () => {
        let g = new MyGame();
        window.document.body.removeChild(ButtonStart);
    }
    window.document.body.appendChild(ButtonStart)
    
}