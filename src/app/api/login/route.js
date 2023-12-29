import { NextResponse } from "next/server";

export async function GET(request)
{
   return NextResponse.json({message: "Get Request"});
}

export async function POST(request)
{
    const body = await request.json();
    console.log(body);
    return NextResponse.json({message: "Form Submited"});
    //return NextResponse.json({email: body.email} );
}