Submit a new issue only if you are sure it is a missing feature or a bug.

## A quick guide for pull request

1. [Fork the repo](https://help.github.com/articles/fork-a-repo) and create a branch for your new feature or bug fix.

2. Make sure build pass. Run: `npm run build`

3. Run unit tests to ensure all features work well. Run: `npm test`

4. Make sure `charites` command work well after installing globally. Run:

```bash
npm uninstall -g .
npm uninstall @unvt/charites
npm install -g
charites help
```

5. Make sure you submit a change specific to exactly one issue. If you have ideas for multiple changes please create separate pull requests.

6. Push to your fork and [submit a pull request](https://help.github.com/articles/using-pull-requests). A button should appear on your fork its github page afterwards.
