import { Actor, Engine, Input, Vector, Color, Sprite, Util, Physics } from "excalibur";
import { redTankBody } from "../Resources/Textures";
import { DrawingHelper } from "../Helprs/DrawingHelper";

Physics.showMotionVectors = true;

export class Test extends Actor {
    public onInitialize(engine: Engine): void {
        super.onInitialize(engine);
        const sprite = redTankBody.asSprite();
        sprite.rotation = -Math.PI / 2;
        sprite.anchor.x = 1;
        this.addDrawing(sprite);
    }

    public update(engine: Engine, delta: number): void {
        super.update(engine, delta);

        // if(engine.input.keyboard.isHeld(Input.Keys.W)){
        //     this.body.vel = Vector.Right.scale(10);
        // }
    }
}

const maxSpeed = 200;

export class Player extends Actor {
    public direction: Vector = Vector.Zero;

    public onInitialize(engine: Engine): void {
        this.add(new Test());
        this.direction = Vector.Right;
    }

    public update(engine: Engine, delta: number): void {
        super.update(engine, delta);

        if (engine.input.keyboard.isHeld(Input.Keys.A)) {
            this.body.rotation -= 0.03;
        }
        if (engine.input.keyboard.isHeld(Input.Keys.D)) {
            this.body.rotation += 0.03;
        }
        this.direction = Vector.Right.rotate(this.body.rotation);
        

        if (engine.input.keyboard.isHeld(Input.Keys.W)) {
            this.acc = this.direction.scale(150);
        } else if (engine.input.keyboard.isHeld(Input.Keys.S)) {
            this.acc = this.direction.scale(-150);
        } else {
            this.acc = this.vel.equals(Vector.Zero, 0.1) ? Vector.Zero : this.vel.normalize().negate().scale(25)
        }
    }

    public draw(ctx: CanvasRenderingContext2D, delta: number) {
        super.draw(ctx, delta);
        this.debugDraw(ctx);
        // DrawingHelper.drawLine(ctx, this.pos, this.vel, Color.Black.toString(), true);
        // DrawingHelper.drawLine(ctx, this.pos, this.acc, Color.Orange.toString(), true)
        // DrawingHelper.drawLine(ctx, this.pos, this.direction.scale(20), Color.Green.toString(), true);;
    }
}