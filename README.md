# minecraft-manager

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

With `pm2`:

```bash
pm2 start --interpreter ~/.bun/bin/bun /$HOME/path/to/index.ts -- /$HOME/path/to/server/directory/ /$HOME/path/to/server/directory/start_script.sh
```

This project was created using `bun init` in bun v1.0.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
