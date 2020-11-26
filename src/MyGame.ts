import Game from 'tsxna-framework/Game';
import GameCanvas from 'tsxna-framework/GameCanvas';
import SpriteBatch from 'tsxna-framework/Graphics/SpriteBatch';
import GameTime from 'tsxna-framework/GameTime';
import Color from 'tsxna-framework/Color';

export default class MyGame extends Game {

    private _spriteBatch:SpriteBatch;
  

    constructor(){
        super();
        
        this.Canvas = new GameCanvas(320,180);
        this.Canvas.Scale = 4;
        this._spriteBatch = new SpriteBatch(this.Canvas);
       
       
    }

    public async LoadContent(){
        super.LoadContent();

    }

    public Update(gameTime:GameTime){
        super.Update(gameTime);
       
    }

    public Draw():void{
        this.Canvas.Clear(Color.CornflowerBlue);
        this._spriteBatch.Begin();

        
       this._spriteBatch.End();
    }


}