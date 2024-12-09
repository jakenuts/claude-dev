# Cline-Unleased

A fork of the amazing Cline (formerly Claude-Dev) that adds an 'Approve All' checkbox to the UI so you can turn full autonomy on & off at any time. See [ChatView.tsx](webview-ui/src/components/chat/ChatView.tsx) for the modified code. Other files have minor textual updates to identify the forked plugin as different than the normal one. They can run side-by-side without issue.

** Also added a very basic rate limit retry.

![image](https://github.com/user-attachments/assets/d2100c67-f4c9-481e-a436-57b34ff00f12)

<a href="https://github.com/cline/cline">
The Actual Cline project
</a>

## GitHub Workflow: Pull Upstream and Merge

This repository includes a GitHub workflow to automate the process of pulling changes from the upstream origin, merging updates from the main branch, and committing the changes to the main branch.

### Workflow File

The workflow file is located at `.github/workflows/pull-upstream-and-merge.yml`.

### Workflow Steps

1. **Checkout Repository**: The workflow checks out the repository.
2. **Pull Upstream Changes**: The workflow pulls changes from the upstream origin.
3. **Merge Updates from Main**: The workflow merges updates from the main branch.
4. **Build Validation**: The workflow ensures the project can build before committing.
5. **Commit Changes to Main**: The workflow commits the changes to the main branch.
6. **Build, Package, and Release**: After committing to the main branch, the workflow builds, packages, and adds a release to the repository.

### Configuration

To configure the workflow, you can modify the `.github/workflows/pull-upstream-and-merge.yml` file as needed. You can adjust the schedule, add additional steps, or customize the existing steps to fit your requirements.

For more information on GitHub workflows, refer to the [GitHub Actions documentation](https://docs.github.com/en/actions).
