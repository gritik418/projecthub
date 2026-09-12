import { Link } from "react-router-dom";
import { FolderKanban, Users, CheckSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <section className="mx-auto max-w-7xl px-6 py-24 text-center">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold text-indigo-600">
              PROJECT MANAGEMENT MADE SIMPLE
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Manage projects.
              <br />
              Get work done.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Organize projects, manage tasks, track progress, and collaborate
              with your team in one place.
            </p>

            <div className="mt-8">
              <Link
                to="/dashboard"
                className="inline-flex rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-white py-16">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <FolderKanban size={22} />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                Manage Projects
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Keep your projects organized and monitor progress easily.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <CheckSquare size={22} />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                Track Tasks
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Manage assignments, priorities, deadlines, and task progress.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Users size={22} />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                Work Together
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Collaborate with your team and stay updated in real time.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
