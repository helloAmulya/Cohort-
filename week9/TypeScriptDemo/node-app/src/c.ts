

// enums -> more useful/readable

enum Direction {
    up,
    down,
    right,
    left

    // up = "up",
    // down = "down",
    // right= "right",
    // left = "left"
    //  if we dont want them to be printed as 0,1,2,3 means do the ts development, but the clg msg/output should be string
    // then we do the above, but if u gave any one as string u have to give it to all
    //  similarly ,(special case) we can start from 1,2.. and not 0,1.. by giving only the first one as -> up = 1 or 10 or etc.. , it will increment as given

}

// type KeyInput = "up" | "down" | "left" | "right"

// function anyFunc(keyPressed: KeyInput) {
// if (keyPressed == "up") {}
// }
// anyFunc("up")
// anyFunc("down")

function anyFunc(keyPressed: Direction) {
    if (keyPressed == Direction.up) { }
}

anyFunc(Direction.up)
anyFunc(Direction.down)


