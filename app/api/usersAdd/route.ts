// export async function GET(){
//   const users = [
//     { id: 1, name: "John Doe", age: 30 },
//     { id: 2, name: "Jane Smith", age: 25 },
//     { id: 3, name: "Alex Johnson", age: 27 },
//     { id: 4, name: "Emily Davis", age: 22 },
//     { id: 5, name: "Michael Brown", age: 35 },
//     { id: 6, name: "Sarah Wilson", age: 28 },
//     { id: 7, name: "David Lee", age: 40 },
//     { id: 8, name: "Sophia Martinez", age: 32 },
//     { id: 9, name: "James Taylor", age: 45 },
//     { id: 10, name: "Olivia White", age: 26 },
//   ];

//   return new Response(JSON.stringify({ users }), {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       });
//     };

import db from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  await db.connect();

  try {
    const body = await req.json();
    const newUser = User.create(body);
    return new Response(JSON.stringify({ newUser }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(null),{status:500})
  }
}
