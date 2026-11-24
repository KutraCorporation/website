# Release process

This repository is a private Next.js application, not a published npm library. Changesets records user-visible changes and versions the application; it does not publish this package to npm.

1. Run `npx changeset` and commit the generated changeset.
2. Merge through the normal review and CI process.
3. Changesets Action opens/updates a version PR.
4. Merge the version PR to update version/changelog and release tags.
5. Verify the GitHub Release and deploy the resulting revision using the existing Cloudflare deployment process.

No production deployment credentials or Cloudflare deployment workflow are created here. Configure those separately after confirming account and target.
