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
                // Slides 26-32 command line · 34-38 vim · 39-42 shells.
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
                summary:
                    "What a server actually is, why your laptop cannot be one, and renting a real one by the month.",
                // Slides 43-46 the node server · 47+ cloud, virtualization and the VPS.
                lessons: [
                    {
                        slug: "what-a-server-is-and-writing-one",
                        title: "What a server is, and writing one in Node",
                        videos: ["Servers", "Create a Simple Node.js Server"],
                    },
                    {
                        slug: "why-your-laptop-is-not-a-server",
                        title: "Why your laptop isn't a server",
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
                summary:
                    "Picking the OS, then the long way round to logging in: why passwords lose, what hashing is, and how SSH keys work.",
                // Slides 53-56 the OS · 57+ passwords, hashing and SSH.
                lessons: [
                    {
                        slug: "operating-systems",
                        title: "Operating systems, and why Ubuntu",
                        videos: ["Operating Systems"],
                    },
                    {
                        slug: "why-not-passwords-and-what-hashing-is",
                        title: "Why not passwords, and what hashing is",
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
                summary:
                    "The machinery under a request: the hops it crosses, the protocols that carry it, the phone book that resolves the name — and the server admin that section slides into.",
                lessons: [
                    {
                        slug: "how-the-internet-works",
                        title: "How the internet works, and how to see it",
                        videos: ["How the Internet Works", "Network Tools Exercise"],
                    },
                    {
                        slug: "tcp-udp-and-packets",
                        title: "TCP, UDP and packets",
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
                        slug: "hardening-a-fresh-server",
                        title: "Hardening a fresh server",
                        videos: [
                            "Update & Restart Server",
                            "Create a User",
                            "File Permissions",
                        ],
                    },
                ],
            },
            {
                id: "application-setup",
                name: "Application Setup",
                summary:
                    "Putting a web server in front of your application, and keeping the application running once you close the laptop.",
                lessons: [
                    {
                        slug: "nginx-and-why-it-sits-in-front",
                        title: "nginx, and why it sits in front",
                        videos: ["Setup Nginx Web Server"],
                    },
                    {
                        slug: "proxying-to-node-and-keeping-it-alive",
                        title: "Proxying to Node, and keeping it alive",
                        videos: ["Setup Proxy Pass", "Virtual Server & PM2"],
                    },
                ],
            },
            {
                id: "git",
                name: "Git",
                summary:
                    "Getting the code off the server and into a repository, so the server stops being your editor.",
                lessons: [
                    {
                        slug: "version-control-and-git",
                        title: "Version control, and getting off the server",
                        videos: ["Git Exercise", "Version Control & Git"],
                    },
                ],
            },
            {
                id: "security",
                name: "Security",
                summary:
                    "What someone gets when they take your server, and the three things that stop them: keys, a firewall, and staying patched.",
                lessons: [
                    {
                        slug: "what-an-attacker-gets",
                        title: "What an attacker gets, and what you left open",
                        videos: ["Security", "View Open Ports with nmap"],
                    },
                    {
                        slug: "firewalls-with-ufw",
                        title: "Firewalls with ufw, and staying patched",
                        videos: ["Firewall & ufw", "Unattended Upgrades"],
                    },
                    {
                        slug: "permissions-properly",
                        title: "Permissions, properly",
                        videos: ["Permissions & chmod"],
                    },
                ],
            },
            {
                id: "continuous-integration-and-deployment",
                name: "Continuous Integration & Deployment",
                lessons: [
                    {
                        slug: "a-fake-ci-cd-pipeline-with-cron",
                        title: "A fake CI/CD pipeline with cron",
                        videos: ["Continuous Integration & Deployment", "Cron for CI"],
                    },
                    {
                        slug: "reading-logs-and-why-commands-compose",
                        title: "Reading logs, and why commands compose",
                        videos: ["Logging, Streams, & Redirection", "find & grep"],
                    },
                    {
                        slug: "redirects-gzip-and-subdomains",
                        title: "Redirects, gzip and subdomains",
                        videos: ["Nginx Redirection & Gzip", "Subdomains"],
                    },
                ],
            },
            {
                id: "realtime-and-databases",
                summary:
                    "Making the connection persistent, giving the data somewhere structured to live, and encrypting the whole thing.",
                name: "Realtime & Databases",
                lessons: [
                    {
                        slug: "websockets",
                        title: "WebSockets",
                        videos: ["Websockets Overview", "Using Websockets with Express", "Creating a Websocket Connection"],
                    },
                    {
                        slug: "databases-and-sqlite",
                        title: "Databases, and SQLite",
                        videos: ["Databases Overview", "SQLite"],
                    },
                    {
                        slug: "http-status-codes-and-https",
                        title: "HTTP, status codes, and HTTPS",
                        videos: ["HTTPS Overview", "Implementing HTTPS with Certbot"],
                    },
                    {
                        slug: "http-2",
                        title: "HTTP/2",
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
