// https://www.seancdavis.com/posts/use-pnpm-with-netlify/
module.exports = {
  onPreBuild: async ({ utils: { build, run } }) => {
    try {
      await run.command("npm install -g pnpm --force");
      await run.command(
        "pnpm install --frozen-lockfile=false -r --shamefully-hoist --store=node_modules/.pnpm-store"
      );
    } catch (error) {
      return build.failBuild(error);
    }
  },
};
