export async function GET() {
  const users = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
    { id: 3, name: "Alex Johnson", age: 27 },
    { id: 4, name: "Emily Davis", age: 22 },
    { id: 5, name: "Michael Brown", age: 35 },
    { id: 6, name: "Sarah Wilson", age: 28 },
    { id: 7, name: "David Lee", age: 40 },
    { id: 8, name: "Sophia Martinez", age: 32 },
    { id: 9, name: "James Taylor", age: 45 },
    { id: 10, name: "Olivia White", age: 26 },
  ];

  return new Response(JSON.stringify({ users }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// import dbConnect from "@/app/lib/dbConnect";
// import User from "@/app/models/User";
// import { NextResponse } from "next/server";

// export default async function GET() {
//   await dbConnect();

//   try {
//     const users = await User.find({});
//     return NextResponse.json(users);  // Ensure you return the response
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message });  // Ensure error response is returned
//   }
// }
