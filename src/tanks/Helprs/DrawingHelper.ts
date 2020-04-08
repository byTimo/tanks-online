import { Vector } from "excalibur";

export class DrawingHelper {
    static drawLine(ctx: CanvasRenderingContext2D, start: Vector, end: Vector, color: string, local = false) {
        end = local ? start.add(end) : end;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    }

    static drawRect(ctx: CanvasRenderingContext2D, pos: Vector, scale: Vector, color: string) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.rect(pos.x, pos.y, scale.x, scale.y);
        ctx.stroke();
    }
}