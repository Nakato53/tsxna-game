import Game from 'tsxna-framework/Game';
import GameCanvas from 'tsxna-framework/GameCanvas';
import SpriteBatch from 'tsxna-framework/Graphics/SpriteBatch';
import ContentLoader from 'tsxna-framework/Content/ContentLoader';
import Loadable from 'tsxna-framework/Content/Loadable';
import Texture2D from 'tsxna-framework/Content/Texture2D';
import Vector2 from 'tsxna-framework/Vector2';
import KeyboardState from 'tsxna-framework/Input/KeyboardState';
import MouseState from 'tsxna-framework/Input/MouseState';
import Mouse from 'tsxna-framework/Input/Mouse';
import Keyboard from 'tsxna-framework/Input/Keyboard';
import Keys from 'tsxna-framework/Input/Keys';
import MouseButtons from 'tsxna-framework/Input/MouseButtons';
import GameTime from 'tsxna-framework/GameTime';
import Color from 'tsxna-framework/Color';
import Rectangle from 'tsxna-framework/Rectangle';
import DrawCallParameter from 'tsxna-framework/Graphics/DrawCallParameter';
import Song from 'tsxna-framework/Content/Song';


export default class MyGame extends Game {

    private spriteBatch:SpriteBatch;
    private contentLoader:ContentLoader;

    private maTexture:Texture2D;
    private maMusique:Song;
    private maPosition:Vector2;

    private oldKeyboard:KeyboardState;
    private currentKeyboard:KeyboardState;

    private maSpeed = 500;

    private positions:Array<any> = [];

    constructor(){
        super();
        
        this.canvas = new GameCanvas(320,180);
        this.canvas.scale = 4;
        this.spriteBatch = new SpriteBatch(this.canvas);
        this.contentLoader = new ContentLoader();


        this.currentKeyboard = Keyboard.GetState();
        this.oldKeyboard = Keyboard.GetState();

        this.maPosition = new Vector2(50,50);

       
    }

    public async LoadContent(){
        super.LoadContent();

        this.maTexture = await this.contentLoader.Load(Texture2D, "Content/images/bloc.png");
        this.maMusique = await this.contentLoader.Load(Song, "Content/musics/background.mp3");

        for (let index = 0; index < 1000; index++) {
            let r = Math.random()*255;
            let g = Math.random()*255;
            let b = Math.random()*255;
            let a = Math.random()*200;
            
            this.positions.push({position:new Vector2(Math.random()*320,Math.random()*180), color: new Color(r,g,b,a), angle: Math.random()*360 });
        }
        this.maMusique.Play();    
    }

    public Update(gameTime:GameTime){
        super.Update(gameTime);
        
        this.currentKeyboard = Keyboard.GetState();

        if(this.currentKeyboard.IsKeyDown(Keys.ArrowLeft)){
            this.maPosition.x-= this.maSpeed*gameTime.ElapsedGameTime;
        }
        if(this.currentKeyboard.IsKeyDown(Keys.ArrowRight)){
            this.maPosition.x+= this.maSpeed*gameTime.ElapsedGameTime;
        }
        if(this.currentKeyboard.IsKeyDown(Keys.ArrowUp)){
            this.maPosition.y-= this.maSpeed*gameTime.ElapsedGameTime;
        }
        if(this.currentKeyboard.IsKeyDown(Keys.ArrowDown)){
            this.maPosition.y+= this.maSpeed*gameTime.ElapsedGameTime;
        }
        this.oldKeyboard = this.currentKeyboard;

        let mouseState:MouseState = Mouse.GetState();
        if(mouseState.IsMouseButtonDown(MouseButtons.Button1)){
            this.maPosition = new Vector2(mouseState.X, mouseState.Y);
        }

    }

    public Draw():void{
        this.canvas.Clear(Color.CornflowerBlue);
        this.spriteBatch.Begin();

        this.spriteBatch.Draw( new DrawCallParameter(this.maTexture).setColor(Color.Red).setPosition(this.maPosition));        

        //player rectangle
        let pRect = new Rectangle(this.maPosition.x, this.maPosition.y, 9,9);

        this.canvas.context.fillStyle = "#ff0000";
       for (let index = 0; index < this.positions.length; index++) {
            let c = Color.White;
            
            let blockRectangle =  new Rectangle(this.positions[index].position.x-4, this.positions[index].position.y-4, 9,9);

            if(pRect.intersect(blockRectangle))
                c=Color.Red;

            this.spriteBatch.Draw(
                new DrawCallParameter(this.maTexture).setSource(new Rectangle(0,4,4,4)).setPosition(this.positions[index].position).setColor(c).setOrigin(new Vector2(2,2)).setAngle(this.positions[index].angle)
            );

       }
        
       this.spriteBatch.End();
    }


}