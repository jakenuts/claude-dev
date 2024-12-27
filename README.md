# Cline-Unleased
* [Find the Latest Release Here](https://github.com/jakenuts/claude-dev/releases)
    
A fork of the amazing Cline (formerly Claude-Dev) that adds an 'Approve All' checkbox to the UI so you can turn full autonomy on & off at any time. See [ChatView.tsx](webview-ui/src/components/chat/ChatView.tsx) for the modified code. Other files have minor textual updates to identify the forked plugin as different than the normal one. They can run side-by-side without issue.

** Also added a very basic rate limit retry.

![image](https://github.com/user-attachments/assets/d2100c67-f4c9-481e-a436-57b34ff00f12)



<a href="https://github.com/cline/cline">
The Actual Cline project
</a>

Thanks to [Claude 3.5 Sonnet's agentic coding capabilities](https://www-cdn.anthropic.com/fed9cc193a14b84131812372d8d5857f8f304c52/Model_Card_Claude_3_Addendum.pdf), Cline can handle complex software development tasks step-by-step. With tools that let him create & edit files, explore large projects, use the browser, and execute terminal commands (after you grant permission), he can assist you in ways that go beyond code completion or tech support. Cline can even use the Model Context Protocol (MCP) to create new tools and extend his own capabilities. While autonomous AI scripts traditionally run in sandboxed environments, this extension provides a human-in-the-loop GUI to approve every file change and terminal command, providing a safe and accessible way to explore the potential of agentic AI.

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="left" width="370" src="https://github.com/user-attachments/assets/81be79a8-1fdb-4028-9129-5fe055e01e76">

### Run Commands in Terminal

Thanks to the new [shell integration updates in VSCode v1.93](https://code.visualstudio.com/updates/v1_93#_terminal-shell-integration-api), Cline can execute commands directly in your terminal and receive the output. This allows him to perform a wide range of tasks, from installing packages and running build scripts to deploying applications, managing databases, and executing tests, all while adapting to your dev environment & toolchain to get the job done right.

For long running processes like dev servers, use the "Proceed While Running" button to let Cline continue in the task while the command runs in the background. As Cline works he'll be notified of any new terminal output along the way, letting him react to issues that may come up, such as compile-time errors when editing files.

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="right" width="400" src="https://github.com/user-attachments/assets/c5977833-d9b8-491e-90f9-05f9cd38c588">

### Create and Edit Files

Cline can create and edit files directly in your editor, presenting you a diff view of the changes. You can edit or revert Cline's changes directly in the diff view editor, or provide feedback in chat until you're satisfied with the result. Cline also monitors linter/compiler errors (missing imports, syntax errors, etc.) so he can fix issues that come up along the way on his own.

All changes made by Cline are recorded in your file's Timeline, providing an easy way to track and revert modifications if needed.

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="left" width="370" src="https://github.com/user-attachments/assets/bc2e85ba-dfeb-4fe6-9942-7cfc4703cbe5">

### Use the Browser

With Claude 3.5 Sonnet's new [Computer Use](https://www.anthropic.com/news/3-5-models-and-computer-use) capability, Cline can launch a browser, click elements, type text, and scroll, capturing screenshots and console logs at each step. This allows for interactive debugging, end-to-end testing, and even general web use! This gives him autonomy to fixing visual bugs and runtime issues without you needing to handhold and copy-pasting error logs yourself.

Try asking Cline to "test the app", and watch as he runs a command like `npm run dev`, launches your locally running dev server in a browser, and performs a series of tests to confirm that everything works. [See a demo here.](https://x.com/sdrzn/status/1850880547825823989)

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="right" width="350" src="https://github.com/user-attachments/assets/ac0efa14-5c1f-4c26-a42d-9d7c56f5fadd">

### "add a tool that..."

Thanks to the [Model Context Protocol](https://github.com/modelcontextprotocol), Cline can extend his capabilities through custom tools. While you can use [community-made servers](https://github.com/modelcontextprotocol/servers), Cline can instead create and install tools tailored to your specific workflow. Just ask Cline to "add a tool" and he will handle everything, from creating a new MCP server to installing it into the extension. These custom tools then become part of Cline's toolkit, ready to use in future tasks.

-   "add a tool that fetches Jira tickets": Retrieve ticket ACs and put Cline to work
-   "add a tool that manages AWS EC2s": Check server metrics and scale instances up or down
-   "add a tool that pulls the latest PagerDuty incidents": Fetch details and ask Cline to fix bugs

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="left" width="360" src="https://github.com/user-attachments/assets/7fdf41e6-281a-4b4b-ac19-020b838b6970">

### Add Context

**`@url`:** Paste in a URL for the extension to fetch and convert to markdown, useful when you want to give Cline the latest docs

**`@problems`:** Add workspace errors and warnings ('Problems' panel) for Cline to fix

**`@file`:** Adds a file's contents so you don't have to waste API requests approving read file (+ type to search files)

**`@folder`:** Adds folder's files all at once to speed up your workflow even more

## Contributing

To contribute to the project, start with our [Contributing Guide](CONTRIBUTING.md) to learn the basics. You can also join our [Discord](https://discord.gg/cline) to chat with other contributors in the `#contributors` channel. If you're looking for full-time work, check out our open positions on our [careers page](https://cline.bot/join-us)!

<details>
<summary>Local Development Instructions</summary>

1. Clone the repository _(Requires [git-lfs](https://git-lfs.com/))_:
    ```bash
    git clone https://github.com/cline/cline.git
    ```
2. Open the project in VSCode:
    ```bash
    code cline
    ```
3. Install the necessary dependencies for the extension and webview-gui:
    ```bash
    npm run install:all
    ```
4. Launch by pressing `F5` (or `Run`->`Start Debugging`) to open a new VSCode window with the extension loaded. (You may need to install the [esbuild problem matchers extension](https://marketplace.visualstudio.com/items?itemName=connor4312.esbuild-problem-matchers) if you run into issues building the project.)

</details>

## License

[Apache 2.0 © 2024 Cline Bot Inc.](./LICENSE)
