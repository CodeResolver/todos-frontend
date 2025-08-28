# Todo App Frontend

This is a modern Todo List App built with Next.js, TypeScript, Tailwind CSS, and Zod for form validation.

## Features

- Add, edit, delete, and mark tasks as complete/incomplete
- Color-coded task organization
- Responsive design following Figma specifications
- Client-side form validation with Zod

## Getting Started

### Prerequisites

- Node.js v22 or higher
- npm v10 or higher

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd todos-frontend
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
# or
npx next dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS v4**: Utility-first CSS framework
- **Zod**: Schema validation
- **Context API**: State management

## Project Structure

```
todos-frontend/
├── public/               # Static assets
├── src/
│   ├── app/              # App Router pages
│   │   ├── tasks/        # Task-related routes
│   │   │   ├── [id]/     # Task edit page
│   │   │   └── new/      # New task page
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # Reusable components
│   ├── context/          # Context API providers
│   ├── services/         # API services
│   └── types/            # TypeScript types and schemas
```

## Next Steps

- Connect to backend API (Express.js + Prisma + MySQL)
- Add user authentication
- Add additional features like task prioritization and due dates

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
