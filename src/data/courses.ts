import type { Course } from "@/types/types"

/**
 * A course is something being worked through; a topic is one of its sections
 * and a lesson is one post at `src/content/<course>/<lesson>.mdx`. A lesson
 * with no file yet reads as pending, so this file is the syllabus and nothing
 * else. `videos` records which lesson videos a post is written from, which is
 * what keeps a post's scope honest.
 *
 * Syllabus read from the course index, not reconstructed from memory.
 */
export const courses: Course[] = [
    {
        slug: "fullstack-v3",
        name: "Full Stack Fundamentals, v3",
        teacher: "Jem Young",
        courseUrl: "https://master.dev/courses/fullstack-v3/",
        summary:
            "Everything under the app: the terminal, a real server, the network it sits on, and the pieces you normally let a platform hide.",
        topics: [
            {
                id: "introduction",
                name: "Introduction",
                lessons: [
                    {
                        slug: "introduction",
                        title: "Introduction",
                        videos: ["Introduction"],
                    },
                    {
                        slug: "what-is-a-full-stack-engineer",
                        title: "What is a full stack engineer",
                        videos: ["What is a Full Stack Engineer"],
                    },
                ],
            },
            {
                id: "command-line",
                name: "Command Line",
                summary:
                    "Talking to the operating system directly — the terminal, the editor that is always installed, and the shell underneath both.",
                lessons: [
                    {
                        slug: "terminal-and-the-commands-that-matter",
                        title: "The terminal, and the commands that matter",
                        videos: ["Command Line Exercise", "Command Line Solution"],
                    },
                    {
                        slug: "editing-files-with-vim",
                        title: "Editing files with Vim",
                        videos: ["VIM Exercise", "VIM Solution"],
                    },
                    {
                        slug: "shells-and-what-they-actually-do",
                        title: "Shells, and what they actually do",
                        videos: ["Shell Exercise", "Shell Solution"],
                    },
                ],
            },
            {
                id: "server",
                name: "Server",
                lessons: [
                    {
                        slug: "servers",
                        title: "Servers",
                        videos: ["Servers"],
                    },
                    {
                        slug: "create-a-simple-node-js-server",
                        title: "Create a simple Node.js server",
                        videos: ["Create a Simple Node.js Server"],
                    },
                    {
                        slug: "server-management",
                        title: "Server management",
                        videos: ["Server Management"],
                    },
                    {
                        slug: "buying-a-vps",
                        title: "Buying a VPS",
                        videos: ["Buying a VPS"],
                    },
                ],
            },
            {
                id: "operating-systems",
                name: "Operating Systems",
                lessons: [
                    {
                        slug: "operating-systems",
                        title: "Operating systems",
                        videos: ["Operating Systems"],
                    },
                    {
                        slug: "security-and-hashing",
                        title: "Security and hashing",
                        videos: ["Security & Hashing"],
                    },
                    {
                        slug: "hashing-with-salt",
                        title: "Hashing with salt",
                        videos: ["Hashing with Salt"],
                    },
                    {
                        slug: "ssh-keys-for-login",
                        title: "SSH keys for login",
                        videos: ["Setup SSH Keys for Login", "SSH Key Recap"],
                    },
                ],
            },
            {
                id: "the-internet",
                name: "The Internet",
                lessons: [
                    {
                        slug: "how-the-internet-works",
                        title: "How the internet works",
                        videos: ["How the Internet Works"],
                    },
                    {
                        slug: "network-tools",
                        title: "Network tools",
                        videos: ["Network Tools Exercise"],
                    },
                    {
                        slug: "internet-and-networking-terminology",
                        title: "Internet and networking terminology",
                        videos: ["Internet & Networking Terminology"],
                    },
                    {
                        slug: "dns-and-urls",
                        title: "DNS and URLs",
                        videos: ["DNS & URLs"],
                    },
                    {
                        slug: "buying-a-domain-name",
                        title: "Buying a domain name",
                        videos: ["Buying a Domain Name"],
                    },
                    {
                        slug: "update-and-restart-the-server",
                        title: "Update and restart the server",
                        videos: ["Update & Restart Server"],
                    },
                    {
                        slug: "creating-a-user",
                        title: "Creating a user",
                        videos: ["Create a User"],
                    },
                    {
                        slug: "file-permissions",
                        title: "File permissions",
                        videos: ["File Permissions"],
                    },
                ],
            },
            {
                id: "application-setup",
                name: "Application Setup",
                lessons: [
                    {
                        slug: "setting-up-nginx",
                        title: "Setting up nginx",
                        videos: ["Setup Nginx Web Server"],
                    },
                    {
                        slug: "proxy-pass",
                        title: "Proxy pass",
                        videos: ["Setup Proxy Pass"],
                    },
                    {
                        slug: "virtual-server-and-pm2",
                        title: "Virtual server and PM2",
                        videos: ["Virtual Server & PM2"],
                    },
                ],
            },
            {
                id: "git",
                name: "Git",
                lessons: [
                    {
                        slug: "version-control-and-git",
                        title: "Version control and git",
                        videos: ["Git Exercise", "Version Control & Git"],
                    },
                ],
            },
            {
                id: "security",
                name: "Security",
                lessons: [
                    {
                        slug: "security",
                        title: "Security",
                        videos: ["Security"],
                    },
                    {
                        slug: "open-ports-with-nmap",
                        title: "Open ports with nmap",
                        videos: ["View Open Ports with nmap"],
                    },
                    {
                        slug: "firewall-and-ufw",
                        title: "Firewall and ufw",
                        videos: ["Firewall & ufw"],
                    },
                    {
                        slug: "permissions-and-chmod",
                        title: "Permissions and chmod",
                        videos: ["Permissions & chmod"],
                    },
                    {
                        slug: "unattended-upgrades",
                        title: "Unattended upgrades",
                        videos: ["Unattended Upgrades"],
                    },
                ],
            },
            {
                id: "continuous-integration-and-deployment",
                name: "Continuous Integration & Deployment",
                lessons: [
                    {
                        slug: "continuous-integration-and-deployment",
                        title: "Continuous integration and deployment",
                        videos: ["Continuous Integration & Deployment"],
                    },
                    {
                        slug: "cron-for-ci",
                        title: "Cron for CI",
                        videos: ["Cron for CI"],
                    },
                    {
                        slug: "logging-streams-and-redirection",
                        title: "Logging, streams and redirection",
                        videos: ["Logging, Streams, & Redirection"],
                    },
                    {
                        slug: "find-and-grep",
                        title: "find and grep",
                        videos: ["find & grep"],
                    },
                    {
                        slug: "nginx-redirection-and-gzip",
                        title: "Nginx redirection and gzip",
                        videos: ["Nginx Redirection & Gzip"],
                    },
                    {
                        slug: "subdomains",
                        title: "Subdomains",
                        videos: ["Subdomains"],
                    },
                ],
            },
            {
                id: "realtime-and-databases",
                name: "Realtime & Databases",
                lessons: [
                    {
                        slug: "websockets",
                        title: "Websockets",
                        videos: ["Websockets Overview", "Using Websockets with Express", "Creating a Websocket Connection"],
                    },
                    {
                        slug: "databases",
                        title: "Databases",
                        videos: ["Databases Overview"],
                    },
                    {
                        slug: "sqlite",
                        title: "SQLite",
                        videos: ["SQLite"],
                    },
                    {
                        slug: "https-with-certbot",
                        title: "HTTPS with Certbot",
                        videos: ["HTTPS Overview", "Implementing HTTPS with Certbot"],
                    },
                    {
                        slug: "supporting-http-2",
                        title: "Supporting HTTP/2",
                        videos: ["Supporting HTTP/2"],
                    },
                ],
            },
            {
                id: "containers",
                name: "Containers",
                lessons: [
                    {
                        slug: "containers",
                        title: "Containers",
                        videos: ["Containers"],
                    },
                    {
                        slug: "creating-a-docker-container",
                        title: "Creating a Docker container",
                        videos: ["Creating a Docker Container"],
                    },
                    {
                        slug: "orchestration-and-load-balancing",
                        title: "Orchestration and load balancing",
                        videos: ["Orchestration & Load Balancing", "Adding a Load Balancer"],
                    },
                ],
            },
            {
                id: "wrapping-up",
                name: "Wrapping Up",
                lessons: [
                    {
                        slug: "wrapping-up",
                        title: "Wrapping up",
                        videos: ["Wrapping Up"],
                    },
                ],
            },
        ],
    },
]

export const courseBySlug = (slug: string) =>
    courses.find((course) => course.slug === slug)

export const listedLessons = (course: Course) =>
    course.topics.flatMap((topic) => topic.lessons)
