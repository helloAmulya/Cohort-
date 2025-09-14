


export function GET() {
    // database logic here (or static data)
    return Response.json({ // works only in Edge runtime , use NextResponse 
        email: "trst@gm.com",
        name: "trr",
    });
}

// import { NextResponse } from "next/server";

// export function GET() {
//   return NextResponse.json({
//     email: "trst@gm.com",
//     name: "trr",
//   });
// }
