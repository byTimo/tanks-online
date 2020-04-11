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

        this.direction = Vector.Right.rotate(this.rotation);
        const isSame = this.direction.dot(this.vel) > 0;
        let vel = Math.min(100, this.vel.magnitude());
        vel = vel > 1 ? vel : 0;

        this.vel = this.direction.scale(vel).scale(isSame ? 1 : -1);

        this.acc = Vector.Zero;

        if (engine.input.keyboard.isHeld(Input.Keys.W)) {
            this.acc.addEqual(this.direction.scale(150));
        } else if (engine.input.keyboard.isHeld(Input.Keys.S)) {
            this.acc.addEqual(this.direction.scale(-150));
        }

        this.acc.addEqual(vel === 0 ? Vector.Zero : this.vel.negate().scale(2));
    }

    public draw(ctx: CanvasRenderingContext2D, delta: number) {
        super.draw(ctx, delta);
        // this.debugDraw(ctx);
        // DrawingHelper.drawLine(ctx, this.pos, this.vel, Color.Black.toString(), true);
        // DrawingHelper.drawLine(ctx, this.pos, this.acc, Color.Orange.toString(), true)
        // DrawingHelper.drawLine(ctx, this.pos, this.direction.scale(20), Color.Green.toString(), true);;
    }
}