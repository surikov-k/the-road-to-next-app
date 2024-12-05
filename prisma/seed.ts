import { hash } from "@node-rs/argon2";
import { PrismaClient, TicketStatus } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  { name: "admin", email: "admin@localhost" },
  { name: "user", email: "surikov@gmail.com" },
];

const tickets = [
  {
    title: "Max Eilerson",
    content:
      "Damned! Damned! Damned silence. He refuses to bow, he refuses to drink. Majesty! Did you know we assigned one of our *best* pain technicians -- pain technicians, they used to be called torturers, ever since they got organized it's 'pain technicians' -- Why are you here? One of our very best torturers, I felt certain he would break him. Two hours he worked, not a sound. I said: 'Give me a cry, rin-tintsy(?). Give me a shout, a whimper, a scream.' Silence! So, I got to it myself. You can't leave these things to others, they never get it right! And well, you can see for yourself. If I didn't know better, I would say he was a mute. Silence! I'm beginning to understand what you're going through with this G'Kar. How you put up with this at all, I have no idea. He was a small burden.",
    status: TicketStatus.OPEN,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
  {
    title: "General Robert Lefcourt",
    content:
      "They taught me what a telepath was and what we can do. And all that time I had never been afraid of who we were. Until that day .. when we did what we had to do because no one else would fight.",
    status: TicketStatus.CLOSED,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399,
  },
  {
    title: "Garrus Vakarian",
    content:
      "The only thing that is not a part of me is the part that is me. You can't just take a part of me and make a whole new person. You have to be a whole new person. You have to be a whole new person.",
    status: TicketStatus.IN_PROGRESS,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 599,
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("DB Seed: started...");

  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await hash("geheimnis");

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({ ...user, passwordHash })),
  });

  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({ ...ticket, userId: dbUsers[0].id })),
  });

  const t1 = performance.now();
  console.log(`DB Seed: completed 🌱 (${t1 - t0}ms)`);
};

seed();
