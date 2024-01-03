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
pm2 start --interpreter ~/.bun/bin/bun /path/to/index.ts -- /path/to/server/directory/
```

# Notes

* `path/to/server/directory` should contain each server folder for active servers.
* the script grabs the activated server from the database and runs the start script in the directoy of the activated server's id

This project was created using `bun init` in bun v1.0.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
