import Game from 'tsxna-framework/Game';
import GameCanvas from 'tsxna-framework/GameCanvas';
import SpriteBatch from 'tsxna-framework/Graphics/SpriteBatch';
import ContentLoader from 'tsxna-framework/Content/ContentLoader';
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


export default class MyGame extends Game {

    private spriteBatch:SpriteBatch;
    private contentLoader:ContentLoader;

    private maTexture:Texture2D;
    private maPosition:Vector2;

    private oldKeyboard:KeyboardState;
    private currentKeyboard:KeyboardState;

    private maSpeed = 500;

    private positions:Array<any> = [];

    constructor(){
        super();
        
        this.canvas = new GameCanvas(320,180);
        this.spriteBatch = new SpriteBatch(this.canvas);
        this.contentLoader = new ContentLoader();


        this.currentKeyboard = Keyboard.GetState();
        this.oldKeyboard = Keyboard.GetState();

        this.maPosition = new Vector2(50,50);

       
    }

    public async LoadContent():Promise<void>{
        super.LoadContent();

        this.maTexture = await this.contentLoader.Load<Texture2D>("Content/images/bloc.png");

        for (let index = 0; index < 20; index++) {
            let r = Math.random()*255;
            let g = Math.random()*255;
            let b = Math.random()*255;
            let a = Math.random()*200;
            
            this.positions.push({position:new Vector2(Math.random()*320,Math.random()*180), color: new Color(r,g,b,a) });
            

        }

    }

    public Update(gameTime:GameTime):void{
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

        this.spriteBatch.Draw( new DrawCallParameter(this.maTexture).setColor(Color.Red).setPosition(this.maPosition) );        

        //player rectangle
        let pRect = new Rectangle(this.maPosition.x, this.maPosition.y, 9,9);

       for (let index = 0; index < this.positions.length; index++) {
            let c = Color.White;
            
            let blockRectangle =  new Rectangle(this.positions[index].position.x, this.positions[index].position.y, 9,9);

            if(pRect.intersect(blockRectangle))
                c=Color.Red;

            this.spriteBatch.Draw(
                new DrawCallParameter(this.maTexture).setPosition(this.positions[index].position).setColor(c)
            );
                
       }
        
       this.spriteBatch.End();
    }


}