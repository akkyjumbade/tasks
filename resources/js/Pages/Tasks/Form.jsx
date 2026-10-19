import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";

export default function Tasks({ title, action = '', initialValues = {} }) {
    const { data, setData, errors, processing, post, patch } = useForm(initialValues)
    function handleSubmit(ev) {
        ev.preventDefault()
        if (initialValues?.id) {
            patch(action)
        } else {
            post(action)
        }
    }
    return (
        <AuthenticatedLayout
            header={<div className="flex justify-between">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {title}
                </h2>
            </div>}
        >
            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">


            <form action={action} method="POST" onSubmit={handleSubmit}>
                <div className="mb-3 space-y-3">
                    <InputLabel htmlFor="title">Title</InputLabel>
                    <TextInput name="title" value={data.title}
                    onChange={(e) => setData('title', e.target.value)} required isFocused />
                    <InputError message={errors.title} />
                </div>
                <div className="mb-3 space-y-3">
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <TextInput name="description" value={data.description}
                    onChange={(e) => setData('description', e.target.value)} required  />
                    <InputError message={errors.description} />
                </div>
                <div className="mb-3 space-y-3">
                    <InputLabel htmlFor="due_date">Due date</InputLabel>
                    <TextInput type="date" name="due_date" value={data.due_date}
                    onChange={(e) => setData('due_date', e.target.value)} required  />
                    <InputError message={errors.due_date} />
                </div>
                <div className="mb-3">
                    <InputLabel htmlFor="title">Status</InputLabel>
                    <select
                    name="status" value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    >
                        <option value=""></option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <InputError message={errors.status} />
                </div>
                <PrimaryButton disabled={processing}>
                    {processing ? 'Saving...': 'Save'}
                </PrimaryButton>
            </form>
            </div>
                    </div>
        </AuthenticatedLayout>
    )
}
