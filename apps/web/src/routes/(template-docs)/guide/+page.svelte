<!--
  Template Guide Page - Template Documentation
  
  This page provides setup instructions and usage guide for the template.
  When removing template documentation for production, delete this entire file and directory.
  
  TEMPLATE DOCS: This entire page should be removed for production use.
-->

<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
  import BookOpenIcon from '@lucide/svelte/icons/book-open';
  import RocketIcon from '@lucide/svelte/icons/rocket';
  import SettingsIcon from '@lucide/svelte/icons/settings';
  import TrashIcon from '@lucide/svelte/icons/trash';
  import { technologies } from '$lib/template-docs/data/technologies.js';
  import { features } from '$lib/template-docs/data/features.js';
  import { Breadcrumb } from '$lib/template-docs/components/index.js';
    import { Editor } from 'svelte-tiptap';
    import { User } from '@lucide/svelte';

  // Get current section from URL hash
  let currentSection = $state('');
  
  $effect(() => {
    if (typeof window !== 'undefined') {
      currentSection = window.location.hash.slice(1) || 'getting-started';
    }
  });

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: RocketIcon },
    { id: 'installation', title: 'Installation', icon: SettingsIcon },
    { id: 'configuration', title: 'Configuration', icon: SettingsIcon },
    { id: 'database-setup', title: 'Database Setup', icon: SettingsIcon },
    { id: 'docker-setup', title: 'Docker Setup', icon: SettingsIcon },
    { id: 'deployment', title: 'Deployment', icon: RocketIcon },
    { id: 'troubleshooting', title: 'Troubleshooting', icon: SettingsIcon },
    { id: 'removal', title: 'Template Removal', icon: TrashIcon }
  ];

  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${sectionId}`);
      currentSection = sectionId;
    }
  }
</script>

<svelte:head>
  <title>Template Setup Guide - Template Documentation</title>
  <meta name="description" content="Complete setup guide for this SvelteKit template including installation, configuration, and deployment instructions." />
  <meta name="robots" content="noindex, nofollow" />
  
  <!-- Open Graph tags for template documentation -->
  <meta property="og:title" content="Template Setup Guide" />
  <meta property="og:description" content="Complete setup guide for this SvelteKit template" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="{$page.url.href}" />
  
  <!-- Template documentation indicator -->
  <meta name="template-docs" content="true" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Header -->
  <header class="bg-white border-b border-gray-200">
    <div class="container mx-auto max-w-7xl px-4 py-6">
      <!-- TEMPLATE DOCS: Breadcrumb Navigation -->
      <!-- Remove this breadcrumb when removing template docs -->
      <Breadcrumb className="mb-6" />
      
      <!-- Template Documentation Notice -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div class="flex items-start gap-3">
          <div class="text-blue-600 text-lg">📚</div>
          <div>
            <h3 class="text-blue-900 font-semibold text-sm mb-1">Template Documentation</h3>
            <p class="text-blue-700 text-sm">
              This guide helps you set up and customize this template. 
              <a href="/roadmap" class="underline hover:no-underline">View roadmap</a> or 
              <a href="/" class="underline hover:no-underline">back to home</a>.
              Remove this entire page for production use.
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 mb-4">
        <BookOpenIcon class="h-8 w-8 text-blue-600" />
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Template Setup Guide</h1>
          <p class="text-gray-600">Everything you need to get started with this SvelteKit template</p>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="flex flex-wrap gap-4 text-sm text-gray-600">
        <div class="flex items-center gap-2">
          <Badge variant="secondary">{technologies.length} Technologies</Badge>
        </div>
        <div class="flex items-center gap-2">
          <Badge variant="secondary">{features.filter(f => f.status === 'complete').length} Complete Features</Badge>
        </div>
        <div class="flex items-center gap-2">
          <Badge variant="secondary">Production Ready</Badge>
        </div>
      </div>
    </div>
  </header>

  <div class="container mx-auto max-w-7xl px-4 py-8">
    <div class="flex gap-8">
      <!-- Sidebar Navigation -->
      <aside class="w-64 flex-shrink-0">
        <div class="sticky top-8">
          <Card>
            <CardHeader>
              <CardTitle class="text-lg">Guide Sections</CardTitle>
            </CardHeader>
            <CardContent class="p-0">
              <nav class="space-y-1">
                {#each sections as section}
                  {@const IconComponent = section.icon}
                  <button
                    class="w-full flex items-center gap-3 px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors {currentSection === section.id ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-gray-700'}"
                    onclick={() => scrollToSection(section.id)}
                  >
                    <IconComponent class="h-4 w-4" />
                    {section.title}
                  </button>
                {/each}
              </nav>
            </CardContent>
          </Card>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 max-w-4xl">
        <div class="space-y-12">
          <!-- Getting Started -->
          <section id="getting-started" class="scroll-mt-8">
            <Card>
              <CardHeader>
                <div class="flex items-center gap-3">
                  <RocketIcon class="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle class="text-2xl">Getting Started</CardTitle>
                    <CardDescription>Quick overview and prerequisites</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent class="space-y-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3">What's Included</h3>
                  <p class="text-gray-600 mb-4">
                    This template provides a modern, production-ready foundation for building web applications. 
                    It includes authentication, rich text editing, UI components, type-safe APIs, and comprehensive development tools.
                  </p>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="p-4 bg-green-50 rounded-lg">
                      <h4 class="font-semibold text-green-800 mb-2">Frontend</h4>
                      <ul class="text-sm text-green-700 space-y-1">
                        <li>• SvelteKit 2 + Svelte 5 runes</li>
                        <li>• TypeScript 5.8+</li>
                        <li>• Tailwind CSS 4</li>
                        <li>• shadcn-svelte + extras</li>
                        <li>• TipTap rich text editor</li>
                        <li>• TanStack Query</li>
                      </ul>
                    </div>
                    <div class="p-4 bg-blue-50 rounded-lg">
                      <h4 class="font-semibold text-blue-800 mb-2">Backend</h4>
                      <ul class="text-sm text-blue-700 space-y-1">
                        <li>• ElysiaJS framework</li>
                        <li>• oRPC for type safety</li>
                        <li>• Better Auth</li>
                        <li>• MongoDB + Mongoose</li>
                        <li>• Ultracite database toolkit</li>
                      </ul>
                    </div>
                    <div class="p-4 bg-purple-50 rounded-lg">
                      <h4 class="font-semibold text-purple-800 mb-2">Development</h4>
                      <ul class="text-sm text-purple-700 space-y-1">
                        <li>• Bun runtime & package manager</li>
                        <li>• Turborepo monorepo</li>
                        <li>• Vitest testing</li>
                        <li>• Biome linting & formatting</li>
                        <li>• Tauri desktop app support</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">Prerequisites</h3>
                  <ul class="space-y-3 text-gray-600">
                    <li class="flex items-start gap-2">
                      <span class="text-green-600 mt-1">✓</span>
                      <div>
                        <strong>Bun 1.2+</strong> - Fast JavaScript runtime and package manager
                        <div class="text-sm text-gray-500 mt-1">
                          Install: <code class="bg-gray-100 px-1 rounded">curl -fsSL https://bun.sh/install | bash</code>
                        </div>
                      </div>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-green-600 mt-1">✓</span>
                      <div>
                        <strong>Node.js 18+</strong> - For compatibility with some tools
                        <div class="text-sm text-gray-500 mt-1">
                          Download from <a href="https://nodejs.org" class="text-blue-600 hover:underline" target="_blank">nodejs.org</a>
                        </div>
                      </div>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-green-600 mt-1">✓</span>
                      <div>
                        <strong>Git</strong> - Version control
                        <div class="text-sm text-gray-500 mt-1">
                          Install: <code class="bg-gray-100 px-1 rounded">brew install git</code> (macOS) or from <a href="https://git-scm.com" class="text-blue-600 hover:underline" target="_blank">git-scm.com</a>
                        </div>
                      </div>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-yellow-600 mt-1">○</span>
                      <div>
                        <strong>MongoDB</strong> - Database (local or cloud)
                        <div class="text-sm text-gray-500 mt-1">
                          Local: <code class="bg-gray-100 px-1 rounded">brew install mongodb-community</code> or use <a href="https://www.mongodb.com/atlas" class="text-blue-600 hover:underline" target="_blank">MongoDB Atlas</a>
                        </div>
                      </div>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-yellow-600 mt-1">○</span>
                      <div>
                        <strong>Docker</strong> - Optional, for containerized development
                        <div class="text-sm text-gray-500 mt-1">
                          Download from <a href="https://docker.com" class="text-blue-600 hover:underline" target="_blank">docker.com</a>
                        </div>
                      </div>
                    </li>
                  </ul>

                  <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 class="font-semibold text-blue-800 text-sm mb-2">💡 Quick Setup Check</h4>
                    <div class="text-sm text-blue-700">
                      Verify your setup with these commands:
                    </div>
                    <div class="bg-blue-900 text-blue-100 p-2 rounded text-xs font-mono mt-2">
                      <div>bun --version  # Should be 1.2+</div>
                      <div>node --version # Should be 18+</div>
                      <div>git --version  # Any recent version</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <!-- Installation -->
          <section id="installation" class="scroll-mt-8">
            <Card>
              <CardHeader>
                <div class="flex items-center gap-3">
                  <SettingsIcon class="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle class="text-2xl">Installation</CardTitle>
                    <CardDescription>Set up the template locally</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent class="space-y-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3">1. Clone the Repository</h3>
                  <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                    <div class="text-gray-400"># Clone the template</div>
                    <div>git clone &lt;repository-url&gt; my-app</div>
                    <div>cd my-app</div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">2. Install Dependencies</h3>
                  <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                    <div class="text-gray-400"># Install all dependencies using Bun</div>
                    <div>bun install</div>
                  </div>
                  <p class="text-sm text-gray-600 mt-2">
                    This will install dependencies for all workspaces in the monorepo.
                  </p>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">3. Start Development Server</h3>
                  <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                    <div class="text-gray-400"># Start all services</div>
                    <div>bun run dev</div>
                    <div class="mt-2 text-gray-400"># Or start individual services</div>
                    <div>bun run dev:web    # Frontend only</div>
                    <div>bun run dev:server # Backend only</div>
                  </div>
                </div>

                <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 class="font-semibold text-green-800 mb-2">✅ Success!</h4>
                  <p class="text-green-700 text-sm">
                    Your application should now be running at <code class="bg-green-100 px-1 rounded">http://localhost:5173</code>
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <!-- Configuration -->
          <section id="configuration" class="scroll-mt-8">
            <Card>
              <CardHeader>
                <div class="flex items-center gap-3">
                  <SettingsIcon class="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle class="text-2xl">Configuration</CardTitle>
                    <CardDescription>Environment variables and settings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent class="space-y-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3">Environment Variables</h3>
                  <p class="text-gray-600 mb-4">
                    Copy the example environment files and configure them for your needs:
                  </p>
                  
                  <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-4">
                    <div class="text-gray-400"># Copy environment files</div>
                    <div>cp .env.example .env</div>
                    <div>cp apps/web/.env.example apps/web/.env</div>
                    <div>cp apps/server/.env.example apps/server/.env</div>
                  </div>

                  <div class="space-y-4">
                    <div>
                      <h4 class="font-semibold mb-2">Root .env</h4>
                      <div class="bg-gray-50 p-3 rounded border text-sm font-mono">
                        <div class="text-gray-600"># Database</div>
                        <div>DATABASE_URL=mongodb://localhost:27017/myapp</div>
                        <div class="mt-2 text-gray-600"># Authentication</div>
                        <div>JWT_SECRET=your-super-secret-jwt-key</div>
                        <div>BETTER_AUTH_SECRET=your-auth-secret</div>
                      </div>
                    </div>

                    <div>
                      <h4 class="font-semibold mb-2">apps/web/.env</h4>
                      <div class="bg-gray-50 p-3 rounded border text-sm font-mono">
                        <div class="text-gray-600"># API Configuration</div>
                        <div>PUBLIC_API_URL=http://localhost:3000</div>
                        <div class="mt-2 text-gray-600"># Template Documentation</div>
                        <div>SHOW_TEMPLATE_DOCS=true</div>
                      </div>
                    </div>

                    <div>
                      <h4 class="font-semibold mb-2">apps/server/.env</h4>
                      <div class="bg-gray-50 p-3 rounded border text-sm font-mono">
                        <div class="text-gray-600"># Server Configuration</div>
                        <div>PORT=3000</div>
                        <div>NODE_ENV=development</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <!-- Database Setup -->
          <section id="database-setup" class="scroll-mt-8">
            <Card>
              <CardHeader>
                <div class="flex items-center gap-3">
                  <SettingsIcon class="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle class="text-2xl">Database Setup</CardTitle>
                    <CardDescription>Configure MongoDB with Ultracite</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent class="space-y-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3">MongoDB Installation</h3>
                  <p class="text-gray-600 mb-4">
                    This template uses MongoDB with Ultracite for database operations. You can use either a local MongoDB instance or a cloud service like MongoDB Atlas.
                  </p>
                  
                  <div class="space-y-4">
                    <div>
                      <h4 class="font-semibold mb-2">Option 1: Local MongoDB</h4>
                      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                        <div class="text-gray-400"># macOS with Homebrew</div>
                        <div>brew tap mongodb/brew</div>
                        <div>brew install mongodb-community</div>
                        <div>brew services start mongodb/brew/mongodb-community</div>
                        <div class="mt-2 text-gray-400"># Ubuntu/Debian</div>
                        <div>sudo apt-get install mongodb</div>
                        <div>sudo systemctl start mongodb</div>
                      </div>
                    </div>

                    <div>
                      <h4 class="font-semibold mb-2">Option 2: MongoDB Atlas (Cloud)</h4>
                      <ol class="list-decimal list-inside space-y-2 text-gray-600 text-sm">
                        <li>Create account at <a href="https://www.mongodb.com/atlas" class="text-blue-600 hover:underline" target="_blank">MongoDB Atlas</a></li>
                        <li>Create a new cluster (free tier available)</li>
                        <li>Create a database user with read/write permissions</li>
                        <li>Add your IP address to the network access list</li>
                        <li>Copy the connection string</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">Database Configuration</h3>
                  <p class="text-gray-600 mb-4">
                    Update your environment variables with the database connection string:
                  </p>
                  
                  <div class="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <div class="text-gray-600"># Local MongoDB</div>
                    <div>DATABASE_URL=mongodb://localhost:27017/myapp</div>
                    <div class="mt-2 text-gray-600"># MongoDB Atlas</div>
                    <div>DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/myapp</div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">Database Operations</h3>
                  <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                    <div class="text-gray-400"># Navigate to server directory</div>
                    <div>cd apps/server</div>
                    <div class="mt-2 text-gray-400"># Push database schema</div>
                    <div>bun run db:push</div>
                    <div class="mt-2 text-gray-400"># Open database studio</div>
                    <div>bun run db:studio</div>
                    <div class="mt-2 text-gray-400"># Run migrations</div>
                    <div>bun run db:migrate</div>
                  </div>
                </div>

                <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 class="font-semibold text-yellow-800 mb-2">💡 Tip</h4>
                  <p class="text-yellow-700 text-sm">
                    The database models are located in <code class="bg-yellow-100 px-1 rounded">apps/server/src/db/models/</code>. 
                    Modify them according to your application needs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <!-- Docker Setup -->
          <section id="docker-setup" class="scroll-mt-8">
            <Card>
              <CardHeader>
                <div class="flex items-center gap-3">
                  <SettingsIcon class="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle class="text-2xl">Docker Setup</CardTitle>
                    <CardDescription>Containerized development and deployment</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent class="space-y-6">
                <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 class="font-semibold text-blue-800 mb-2">🚧 Coming Soon</h4>
                  <p class="text-blue-700 text-sm">
                    Docker configuration is planned for a future release. Check the <a href="/roadmap" class="underline hover:no-underline">roadmap</a> for updates.
                  </p>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">Prerequisites</h3>
                  <ul class="space-y-2 text-gray-600">
                    <li class="flex items-start gap-2">
                      <span class="text-green-600 mt-1">✓</span>
                      <span><strong>Docker</strong> - Container platform</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-green-600 mt-1">✓</span>
                      <span><strong>Docker Compose</strong> - Multi-container orchestration</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">Planned Features</h3>
                  <ul class="space-y-2 text-gray-600">
                    <li class="flex items-start gap-2">
                      <span class="text-gray-400 mt-1">○</span>
                      <span>Development environment with hot reload</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-gray-400 mt-1">○</span>
                      <span>Production-ready multi-stage builds</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-gray-400 mt-1">○</span>
                      <span>MongoDB container configuration</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-gray-400 mt-1">○</span>
                      <span>Docker Compose for full stack</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">Manual Docker Setup</h3>
                  <p class="text-gray-600 mb-4">
                    While we work on official Docker support, you can create your own Dockerfile:
                  </p>
                  
                  <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                    <div class="text-gray-400"># Example Dockerfile for the web app</div>
                    <div>FROM oven/bun:1 as base</div>
                    <div>WORKDIR /app</div>
                    <div>COPY package.json bun.lockb ./</div>
                    <div>RUN bun install --frozen-lockfile</div>
                    <div>COPY . .</div>
                    <div>RUN bun run build</div>
                    <div>EXPOSE 3000</div>
                    <div>CMD ["bun", "run", "start"]</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <!-- Deployment -->
          <section id="deployment" class="scroll-mt-8">
            <Card>
              <CardHeader>
                <div class="flex items-center gap-3">
                  <RocketIcon class="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle class="text-2xl">Deployment</CardTitle>
                    <CardDescription>Deploy your application to production</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent class="space-y-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3">Deployment Options</h3>
                  <p class="text-gray-600 mb-4">
                    This template supports multiple deployment strategies. Choose the one that best fits your needs.
                  </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="p-4 border rounded-lg">
                    <h4 class="font-semibold mb-2 flex items-center gap-2">
                      <span class="text-blue-600">🚀</span>
                      Vercel (Recommended)
                    </h4>
                    <p class="text-sm text-gray-600 mb-3">
                      Easy deployment with automatic builds and serverless functions.
                    </p>
                    <div class="bg-gray-900 text-gray-100 p-3 rounded text-xs font-mono">
                      <div>npm i -g vercel</div>
                      <div>vercel --prod</div>
                    </div>
                  </div>

                  <div class="p-4 border rounded-lg">
                    <h4 class="font-semibold mb-2 flex items-center gap-2">
                      <span class="text-purple-600">🐙</span>
                      Coolify (Self-hosted)
                    </h4>
                    <p class="text-sm text-gray-600 mb-3">
                      Self-hosted deployment platform with Git integration.
                    </p>
                    <div class="text-xs text-gray-500">
                      Connect your Git repository to Coolify for automatic deployments.
                    </div>
                  </div>

                  <div class="p-4 border rounded-lg">
                    <h4 class="font-semibold mb-2 flex items-center gap-2">
                      <span class="text-orange-600">🔥</span>
                      Netlify
                    </h4>
                    <p class="text-sm text-gray-600 mb-3">
                      Static site hosting with serverless functions.
                    </p>
                    <div class="bg-gray-900 text-gray-100 p-3 rounded text-xs font-mono">
                      <div>npm i -g netlify-cli</div>
                      <div>netlify deploy --prod</div>
                    </div>
                  </div>

                  <div class="p-4 border rounded-lg">
                    <h4 class="font-semibold mb-2 flex items-center gap-2">
                      <span class="text-gray-600">🐳</span>
                      Docker + VPS
                    </h4>
                    <p class="text-sm text-gray-600 mb-3">
                      Traditional server deployment with containers.
                    </p>
                    <div class="text-xs text-gray-500">
                      Requires Docker setup (see Docker section above).
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">Pre-deployment Checklist</h3>
                  <div class="space-y-2">
                    <label class="flex items-center gap-2">
                      <input type="checkbox" class="rounded" />
                      <span class="text-sm">Remove template documentation (see removal section)</span>
                    </label>
                    <label class="flex items-center gap-2">
                      <input type="checkbox" class="rounded" />
                      <span class="text-sm">Configure production environment variables</span>
                    </label>
                    <label class="flex items-center gap-2">
                      <input type="checkbox" class="rounded" />
                      <span class="text-sm">Set up production database</span>
                    </label>
                    <label class="flex items-center gap-2">
                      <input type="checkbox" class="rounded" />
                      <span class="text-sm">Configure authentication secrets</span>
                    </label>
                    <label class="flex items-center gap-2">
                      <input type="checkbox" class="rounded" />
                      <span class="text-sm">Test build process locally</span>
                    </label>
                    <label class="flex items-center gap-2">
                      <input type="checkbox" class="rounded" />
                      <span class="text-sm">Set up monitoring and error tracking</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">Production Environment Variables</h3>
                  <div class="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <div class="text-gray-600"># Production settings</div>
                    <div>NODE_ENV=production</div>
                    <div>SHOW_TEMPLATE_DOCS=false</div>
                    <div class="mt-2 text-gray-600"># Database (use production MongoDB)</div>
                    <div>DATABASE_URL=mongodb+srv://prod-user:password@cluster.mongodb.net/prod-db</div>
                    <div class="mt-2 text-gray-600"># Authentication (generate secure secrets)</div>
                    <div>JWT_SECRET=your-production-jwt-secret</div>
                    <div>BETTER_AUTH_SECRET=your-production-auth-secret</div>
                    <div class="mt-2 text-gray-600"># API URL (your production domain)</div>
                    <div>PUBLIC_API_URL=https://api.yourdomain.com</div>
                  </div>
                </div>

                <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 class="font-semibold text-green-800 mb-2">🎉 Ready to Deploy!</h4>
                  <p class="text-green-700 text-sm">
                    Your application is now ready for production deployment. Choose your preferred platform and follow their specific deployment guides.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <!-- Troubleshooting -->
          <section id="troubleshooting" class="scroll-mt-8">
            <Card>
              <CardHeader>
                <div class="flex items-center gap-3">
                  <SettingsIcon class="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle class="text-2xl">Troubleshooting</CardTitle>
                    <CardDescription>Common issues and solutions</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent class="space-y-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3">Installation Issues</h3>
                  
                  <div class="space-y-4">
                    <div class="border-l-4 border-yellow-400 pl-4">
                      <h4 class="font-semibold text-gray-800 mb-2">Bun installation fails</h4>
                      <p class="text-sm text-gray-600 mb-2">
                        If Bun installation fails, try installing with curl:
                      </p>
                      <div class="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono">
                        <div>curl -fsSL https://bun.sh/install | bash</div>
                        <div>source ~/.bashrc</div>
                      </div>
                    </div>

                    <div class="border-l-4 border-yellow-400 pl-4">
                      <h4 class="font-semibold text-gray-800 mb-2">Dependencies won't install</h4>
                      <p class="text-sm text-gray-600 mb-2">
                        Clear cache and reinstall:
                      </p>
                      <div class="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono">
                        <div>rm -rf node_modules bun.lockb</div>
                        <div>bun install</div>
                      </div>
                    </div>

                    <div class="border-l-4 border-yellow-400 pl-4">
                      <h4 class="font-semibold text-gray-800 mb-2">Port already in use</h4>
                      <p class="text-sm text-gray-600 mb-2">
                        Kill processes using the ports:
                      </p>
                      <div class="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono">
                        <div class="text-gray-400"># Kill process on port 5173 (frontend)</div>
                        <div>lsof -ti:5173 | xargs kill -9</div>
                        <div class="text-gray-400"># Kill process on port 3000 (backend)</div>
                        <div>lsof -ti:3000 | xargs kill -9</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">Database Issues</h3>
                  
                  <div class="space-y-4">
                    <div class="border-l-4 border-red-400 pl-4">
                      <h4 class="font-semibold text-gray-800 mb-2">Cannot connect to MongoDB</h4>
                      <p class="text-sm text-gray-600 mb-2">
                        Check your connection string and ensure MongoDB is running:
                      </p>
                      <div class="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono">
                        <div class="text-gray-400"># Check if MongoDB is running locally</div>
                        <div>brew services list | grep mongodb</div>
                        <div class="text-gray-400"># Start MongoDB if not running</div>
                        <div>brew services start mongodb/brew/mongodb-community</div>
                      </div>
                    </div>

                    <div class="border-l-4 border-red-400 pl-4">
                      <h4 class="font-semibold text-gray-800 mb-2">Database schema errors</h4>
                      <p class="text-sm text-gray-600 mb-2">
                        Reset and push the schema:
                      </p>
                      <div class="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono">
                        <div>cd apps/server</div>
                        <div>bun run db:push --force</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">Build Issues</h3>
                  
                  <div class="space-y-4">
                    <div class="border-l-4 border-blue-400 pl-4">
                      <h4 class="font-semibold text-gray-800 mb-2">TypeScript errors</h4>
                      <p class="text-sm text-gray-600 mb-2">
                        Check for type errors and regenerate types:
                      </p>
                      <div class="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono">
                        <div>bun run type-check</div>
                        <div>bun run build</div>
                      </div>
                    </div>

                    <div class="border-l-4 border-blue-400 pl-4">
                      <h4 class="font-semibold text-gray-800 mb-2">Import errors</h4>
                      <p class="text-sm text-gray-600 mb-2">
                        Ensure all imports use correct paths and extensions:
                      </p>
                      <div class="bg-gray-50 p-3 rounded border text-sm">
                        <div class="text-gray-600">// Correct import syntax</div>
                        <div>import { Button } from '$lib/components/ui/button/index.js';</div>
                        <div>import type { User } from '$lib/types.js';</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">Authentication Issues</h3>
                  
                  <div class="space-y-4">
                    <div class="border-l-4 border-purple-400 pl-4">
                      <h4 class="font-semibold text-gray-800 mb-2">JWT token errors</h4>
                      <p class="text-sm text-gray-600 mb-2">
                        Ensure JWT_SECRET is set and consistent:
                      </p>
                      <div class="bg-gray-50 p-3 rounded border text-sm font-mono">
                        <div class="text-gray-600"># Generate a secure secret</div>
                        <div>openssl rand -base64 32</div>
                      </div>
                    </div>

                    <div class="border-l-4 border-purple-400 pl-4">
                      <h4 class="font-semibold text-gray-800 mb-2">Session not persisting</h4>
                      <p class="text-sm text-gray-600 mb-2">
                        Check BETTER_AUTH_SECRET and cookie settings:
                      </p>
                      <div class="bg-gray-50 p-3 rounded border text-sm">
                        <div class="text-gray-600">// Ensure secure cookie settings in production</div>
                        <div>BETTER_AUTH_SECRET=your-secure-secret</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">Template-Specific Issues</h3>
                  
                  <div class="space-y-4">
                    <div class="border-l-4 border-orange-400 pl-4">
                      <h4 class="font-semibold text-gray-800 mb-2">TipTap editor not loading</h4>
                      <p class="text-sm text-gray-600 mb-2">
                        TipTap requires proper initialization. Check for:
                      </p>
                      <div class="bg-gray-50 p-3 rounded border text-sm">
                        <div class="text-gray-600">// Ensure proper TipTap imports</div>
                        <div>import { Editor } from '@tiptap/core';</div>
                        <div>import StarterKit from '@tiptap/starter-kit';</div>
                      </div>
                    </div>

                    <div class="border-l-4 border-orange-400 pl-4">
                      <h4 class="font-semibold text-gray-800 mb-2">oRPC type errors</h4>
                      <p class="text-sm text-gray-600 mb-2">
                        Ensure both client and server use the same oRPC version:
                      </p>
                      <div class="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono">
                        <div>bun update @orpc/client @orpc/server</div>
                        <div>bun run check-types</div>
                      </div>
                    </div>

                    <div class="border-l-4 border-orange-400 pl-4">
                      <h4 class="font-semibold text-gray-800 mb-2">Tailwind CSS 4 issues</h4>
                      <p class="text-sm text-gray-600 mb-2">
                        Tailwind CSS 4 is in alpha. If you encounter issues:
                      </p>
                      <div class="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono">
                        <div class="text-gray-400"># Check Tailwind config</div>
                        <div>cat tailwind.config.js</div>
                        <div class="text-gray-400"># Rebuild CSS</div>
                        <div>bun run build</div>
                      </div>
                    </div>

                    <div class="border-l-4 border-orange-400 pl-4">
                      <h4 class="font-semibold text-gray-800 mb-2">Mongoose connection issues</h4>
                      <p class="text-sm text-gray-600 mb-2">
                        Check MongoDB connection and Mongoose setup:
                      </p>
                      <div class="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono">
                        <div class="text-gray-400"># Test MongoDB connection</div>
                        <div>mongosh "your-connection-string"</div>
                        <div class="text-gray-400"># Check server logs</div>
                        <div>cd apps/server && bun run dev</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">Performance Issues</h3>
                  
                  <div class="space-y-4">
                    <div class="border-l-4 border-green-400 pl-4">
                      <h4 class="font-semibold text-gray-800 mb-2">Slow development server</h4>
                      <p class="text-sm text-gray-600 mb-2">
                        Try clearing cache and restarting:
                      </p>
                      <div class="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono">
                        <div>rm -rf .svelte-kit node_modules/.cache</div>
                        <div>bun install</div>
                        <div>bun run dev</div>
                      </div>
                    </div>

                    <div class="border-l-4 border-green-400 pl-4">
                      <h4 class="font-semibold text-gray-800 mb-2">Large bundle size</h4>
                      <p class="text-sm text-gray-600 mb-2">
                        Analyze bundle and remove unused dependencies:
                      </p>
                      <div class="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono">
                        <div>bun run build</div>
                        <div>bun run preview</div>
                        <div class="text-gray-400"># Check network tab for bundle sizes</div>
                      </div>
                    </div>

                    <div class="border-l-4 border-green-400 pl-4">
                      <h4 class="font-semibold text-gray-800 mb-2">TanStack Query caching issues</h4>
                      <p class="text-sm text-gray-600 mb-2">
                        Clear query cache or adjust cache settings:
                      </p>
                      <div class="bg-gray-50 p-3 rounded border text-sm">
                        <div class="text-gray-600">// Clear all queries</div>
                        <div>queryClient.clear();</div>
                        <div class="text-gray-600">// Or invalidate specific queries</div>
                        <div>queryClient.invalidateQueries(&lbrace; queryKey: ['key'] &rbrace;);</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 class="font-semibold text-blue-800 mb-2">💬 Need More Help?</h4>
                  <p class="text-blue-700 text-sm mb-3">
                    If you're still experiencing issues, try these resources:
                  </p>
                  <ul class="text-blue-700 text-sm space-y-1">
                    <li>• Check the <a href="https://kit.svelte.dev/docs" class="underline hover:no-underline" target="_blank">SvelteKit documentation</a></li>
                    <li>• Visit the <a href="https://bun.sh/docs" class="underline hover:no-underline" target="_blank">Bun documentation</a></li>
                    <li>• Search existing issues on GitHub</li>
                    <li>• Create a new issue with detailed error information</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          <!-- Template Removal -->
          <section id="removal" class="scroll-mt-8">
            <Card>
              <CardHeader>
                <div class="flex items-center gap-3">
                  <TrashIcon class="h-6 w-6 text-red-600" />
                  <div>
                    <CardTitle class="text-2xl">Template Removal</CardTitle>
                    <CardDescription>Remove template documentation for production</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent class="space-y-6">
                <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 class="font-semibold text-red-800 mb-2">⚠️ Important</h4>
                  <p class="text-red-700 text-sm">
                    Before deploying to production, remove all template documentation to avoid confusion and reduce bundle size.
                  </p>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">Quick Removal Steps</h3>
                  <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                    <div class="text-gray-400"># Remove template documentation</div>
                    <div>rm -rf src/lib/template-docs/</div>
                    <div>rm -rf src/routes/(template-docs)/</div>
                    <div>rm -rf static/template-docs/</div>
                    <div class="mt-2 text-gray-400"># Remove from main page</div>
                    <div class="text-yellow-300"># Edit src/routes/+page.svelte and remove TemplateShowcase</div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">What to Remove</h3>
                  <ul class="space-y-2 text-gray-600">
                    <li class="flex items-start gap-2">
                      <span class="text-red-600 mt-1">✗</span>
                      <span><code class="bg-gray-100 px-1 rounded">src/lib/template-docs/</code> - All template documentation code</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-red-600 mt-1">✗</span>
                      <span><code class="bg-gray-100 px-1 rounded">src/routes/(template-docs)/</code> - Guide and roadmap pages</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-red-600 mt-1">✗</span>
                      <span><code class="bg-gray-100 px-1 rounded">static/template-docs/</code> - Template assets and logos</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-red-600 mt-1">✗</span>
                      <span>TemplateShowcase component usage in main page</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">Verification Checklist</h3>
                  <div class="space-y-2">
                    <label class="flex items-center gap-2">
                      <input type="checkbox" class="rounded" />
                      <span class="text-sm">Application builds successfully</span>
                    </label>
                    <label class="flex items-center gap-2">
                      <input type="checkbox" class="rounded" />
                      <span class="text-sm">No broken imports or missing files</span>
                    </label>
                    <label class="flex items-center gap-2">
                      <input type="checkbox" class="rounded" />
                      <span class="text-sm">Navigation works correctly</span>
                    </label>
                    <label class="flex items-center gap-2">
                      <input type="checkbox" class="rounded" />
                      <span class="text-sm">No template-specific content visible</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        <!-- Footer -->
        <footer class="mt-16 pt-8 border-t border-gray-200">
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p class="text-sm text-gray-600">
              Template Documentation - Remove for production use
            </p>
            <div class="flex gap-4">
              <Button variant="outline" size="sm" onclick={() => window.open('/roadmap', '_blank')}>
                <ExternalLinkIcon class="h-4 w-4 mr-2" />
                View Roadmap
              </Button>
              <Button variant="outline" size="sm" onclick={() => window.open('/', '_blank')}>
                <ExternalLinkIcon class="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  </div>
</div>

<style>
  /* Smooth scrolling for anchor links */
  html {
    scroll-behavior: smooth;
  }
  
  /* Code block styling */
  code {
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  }
</style>