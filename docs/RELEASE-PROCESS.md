# Release process

This repository is a private Next.js application, not a published npm library. Changesets is used to record and version application releases; it does not publish this package to npm.

1. Add a changeset for user-visible changes: `npx changeset`.
2. Merge changes through the normal review and CI process.
3. The Changesets GitHub Action opens/updates a version PR.
4. Merge the version PR to update `package.json`, changelog, and release tags.
5. Verify the GitHub Release and deploy the resulting revision through the existing Cloudflare deployment process.

No production deployment credentials or Cloudflare deploy workflow are created here. Configure those separately in repository environments after verifying the deployment account and target.
