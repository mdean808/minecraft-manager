import { spawn } from "child_process";
import { fetchServerInfo } from "minestat-es";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const sendDiscordMessage = async (
  title: string,
  description: string,
  color: number,
) => {
  await fetch(process.env.DISCORD_WEBHOOK || "", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: null,
      embeds: [
        {
          title,
          description,
          color,
        },
      ],
    }),
  });
};

const stopEc2Instance = async () => {
  const res = await fetch(
    "https://stopminecraftserver-ykuqto64rq-uc.a.run.app",
    { headers: { authorization: process.env.AUTH || "" } },
  );
  console.log("stop:", res.status, res.statusText);
};

// start function
(async () => {
  // bun index.ts SERVERS_DIR
  const res = await fetch(
    "https://getactiverminecraftserver-ykuqto64rq-uc.a.run.app",
  );
  const { version, script, id } = await res.json();

  sendDiscordMessage(
    "Server Start",
    `Starting ${id}@${version} server...`,
    1479403,
  );
  const server = spawn(`${process.argv[2]}/${id}/${script}`, {
    cwd: `${process.argv[2]}/${id}/`,
  });

  setInterval(async () => {
    const { players, online } = await fetchServerInfo({
      address: "127.0.0.1",
      port: 25565,
    });
    if (online) {
      if (players === 0) {
        sendDiscordMessage(
          "Server Stop",
          "Stopping server due to inactivity.",
          1479403,
        );
        //stop the server
        server.stdin.write("stop\r");
        // delay 60 seconds so the process stops correctly
        await delay(60000);
        server.kill("SIGINT");
        await delay(2000);
        await sendDiscordMessage("Server Stop", "Server stopped.", 1479403);
        await stopEc2Instance();
      }
    }
  }, 900000); // every 15 minutes

  server.stderr.on("data", (data: Buffer) => {
    sendDiscordMessage("Server Error", data.toString(), 14811136);
  });

  server.stdout.on("data", (data: Buffer) => {
    sendDiscordMessage("Server Log", data.toString(), 1877258);
  });
})();

