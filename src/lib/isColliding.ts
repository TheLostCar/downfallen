import Vector2D from "@/customTypes/Vector2D";

type Rect = {
    width: number,
    height: number,
} & Vector2D;



function isColliding(r1: Rect, r2: Rect) {
    if (r1.x >= r2.x + r2.width) return false;
    if (r1.x + r1.width <= r2.x) return false;
    if (r1.y >= r2.y + r2.height) return false;
    if (r1.y + r1.height <= r2.y) return false;
    return true;
}

export default isColliding;