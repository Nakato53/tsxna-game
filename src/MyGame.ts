import Game from 'tsxna-framework/src/Game';
import GameCanvas from 'tsxna-framework/src/GameCanvas';
import SpriteBatch from 'tsxna-framework/src/Graphics/SpriteBatch';
import GameTime from 'tsxna-framework/src/GameTime';
import Color from 'tsxna-framework/src/Color';
import Texture2D from 'tsxna-framework/src/Content/Texture2D';
import DrawCallParameter from 'tsxna-framework/src/Graphics/DrawCallParameter';
import Vector2 from 'tsxna-framework/src/Vector2';
import Song from 'tsxna-framework/src/Content/Song';

export default class MyGame extends Game {

    private _spriteBatch:SpriteBatch;
    private _bloc:Texture2D;
    private _music:Song;

    constructor(){
        super();
        
        this.Canvas = new GameCanvas(320,240);
        this.Canvas.AutoScale = true;
        this._spriteBatch = new SpriteBatch(this.Canvas);
       
       
    }

    public async LoadContent(){
        super.LoadContent();
        this._bloc = await this.Content.Load(Texture2D, "Content/images/bloc.png");
        this._music = await this.Content.Load(Song,"Content/musics/background.mp3");

        this._music.Play();
    }

    public Update(gameTime:GameTime){
        super.Update(gameTime);
       
    }

    public Draw():void{
        this.Canvas.Clear(Color.CornflowerBlue);
        this._spriteBatch.Begin();

        this._spriteBatch.Draw(new DrawCallParameter(this._bloc).setPosition(new Vector2(300,239)));
        
       this._spriteBatch.End();
    }


}