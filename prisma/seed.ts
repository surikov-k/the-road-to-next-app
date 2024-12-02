import { PrismaClient, TicketStatus } from "@prisma/client";

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Ticket 1",
    content:
      "Damned! Damned! Damned silence. He refuses to bow, he refuses to drink. Majesty! Did you know we assigned one of our *best* pain technicians -- pain technicians, they used to be called torturers, ever since they got organized it's 'pain technicians' -- Why are you here? One of our very best torturers, I felt certain he would break him. Two hours he worked, not a sound. I said: 'Give me a cry, rin-tintsy(?). Give me a shout, a whimper, a scream.' Silence! So, I got to it myself. You can't leave these things to others, they never get it right! And well, you can see for yourself. If I didn't know better, I would say he was a mute. Silence! I'm beginning to understand what you're going through with this G'Kar. How you put up with this at all, I have no idea. He was a small burden.",
  },
  {
    title: "Ticket 2",
    content: "This is the ticket 2",
    status: TicketStatus.CLOSED,
  },
  {
    title: "Ticket 3",
    content: "This is the ticket 3",
    status: TicketStatus.IN_PROGRESS,
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("DB Seed: started...");
  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: tickets,
  });

  const t1 = performance.now();
  console.log(`DB Seed: completed 🌱 (${t1 - t0}ms)`);
};

seed();
