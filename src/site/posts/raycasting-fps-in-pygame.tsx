import { A, H2, P, UL } from '../Prose';
import type { IPostMeta } from '../posts';

export const meta: IPostMeta = {
    slug: "raycasting-fps-in-pygame",
    title: "A ray-casting shooter in Python: rendering and enemy pathfinding",
    date: "2026-11-17",
    summary: "Combat is a DOOM-style first-person shooter in Python and Pygame. Notes on how the renderer draws a 3D view from a 2D map and how enemies find the player.",
    readingMinutes: 4,
    tags: ["Game development", "Python", "Algorithms"],
};

const Post = () => (
    <>
        <P>{"Combat is a DOOM and Wolfenstein-inspired first-person shooter written in Python with Pygame ("}<A href="https://github.com/Vishal-Krishna-Kumar/Combat-Algo-Game">{"code"}</A>{", "}<A href="https://vishalkrishna.itch.io/combat">{"Windows build on itch.io"}</A>{"). The engine follows the well-known structure of Stanislav Petrov's open-source DOOM-style ray-casting game for Pygame; the repository also has a mini-map, health and ammo pickups and a weapon manager. This post explains how the main parts work."}</P>
        <H2>{"A 3D view from a 2D map"}</H2>
        <P>{"The world is a 2D grid where each cell is either empty or a wall. For every vertical strip of the screen the renderer casts one ray from the player into the grid and steps it from grid line to grid line until it hits a wall. The distance to that wall decides how tall the strip is drawn: near walls are tall, far walls are short. Doing this for every column produces the first-person view."}</P>
        <UL>
            <li>{"Stepping along grid lines is much faster than moving the ray in small increments, because the ray only checks the places where it can cross into a wall."}</li>
            <li>{"The raw distance makes walls bulge toward the edges of the screen. Multiplying it by the cosine of the angle between the ray and the view direction removes that fisheye effect."}</li>
            <li>{"Enemies and pickups are flat images scaled by distance. Everything is sorted by depth and drawn from far to near, so nearer things cover farther ones."}</li>
        </UL>
        <H2>{"Enemies that find you"}</H2>
        <P>{"Because the map is a grid, the walkable cells form a graph with up to eight neighbours per cell. Each enemy runs a breadth-first search over that graph from its own cell to the player's cell and takes the first step of the shortest path, treating cells occupied by other enemies as blocked so they do not stack on one square. Results are cached, since many enemies ask for the same routes."}</P>
        <P>{"Before moving, an enemy casts its own ray toward the player. If nothing blocks it, the enemy has a line of sight and can attack; if a wall is in the way, it keeps following the path."}</P>
        <H2>{"Spawning"}</H2>
        <P>{"Enemy types are drawn with fixed weights of 70, 20 and 10, so the weakest type is the most common. Spawn positions are picked at random but never inside walls and never in the area around the player's starting point, so a new game does not open with an enemy on top of you."}</P>
        <H2>{"Controls"}</H2>
        <P>{"W, A, S and D move, the mouse turns the view, and Space fires."}</P>
    </>
);

export default Post;
