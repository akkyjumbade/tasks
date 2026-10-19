import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function Tasks({ tasks, status = '*' }) {
    return (
        <AuthenticatedLayout
            header={<div className="flex justify-between">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tasks
                </h2>
                <Link href={'/tasks/create'}>
                    <PrimaryButton>New Task</PrimaryButton>
                </Link>

            </div>}
        >
            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 mt-4">
                <div>
                    Status:
                    <div className="flex gap-3">
                        <Link className={`rounded-full px-4 py-1.5 border ${status == '' ? 'text-bold': ''}`} href={`/tasks?status=*`}>All</Link>
                        <Link className={`rounded-full px-4 py-1.5 border ${status == 'Pending' ? 'text-bold': ''}`} href={`/tasks?status=Pending`}>Pending</Link>
                        <Link className={`rounded-full px-4 py-1.5 border ${status == 'In Progress' ? 'text-bold': ''}`} href={`/tasks?status=In Progress`}>In Progress</Link>
                        <Link className={`rounded-full px-4 py-1.5 border ${status == 'Completed' ? 'text-bold': ''}`} href={`/tasks?status=Completed`}>Completed</Link>
                    </div>
                </div>
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">

                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="text-start">Title</th>
                                <th className="text-start">Description</th>
                                <th className="text-start">Due date</th>
                                <th className="text-start">Status</th>
                                <th className="text-start">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks?.data?.map((task) => (
                                <tr>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.due_date}</td>
                                    <td>{task.status}</td>
                                    <td className="text-end">
                                        <Link href={`/tasks/${task.id}/edit`}>
                                        <SecondaryButton >
                                            Edit
                                        </SecondaryButton>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
