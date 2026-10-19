<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // return Task::all();
        $tasks = Task::query();
        $tasks->latest();
        $status = $request->query('status');
        if ($status) {
            if (!$status || $status == '*') {
                // Fetch all
            } else {
                $tasks->where('status', $status);
            }
        }
        $tasks->where('user_id', $request->user()->id);
        $tasks = $tasks->paginate(10);
        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'status' => $status,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $action = route('tasks.store');
        return Inertia::render('Tasks/Form', [
            'title' => 'New task',
            'action' => $action,
            'initialValues' => new Task([
                'title' => ''
            ])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $userId = $request->user()->id;
        Task::create($request->validated() + [
            'user_id' => $userId
        ]);
        return redirect()->route('tasks.index')->with('success', 'New task created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $action = route('tasks.update', $task);
        return Inertia::render('Tasks/Form', [
            'title' => 'Edit task',
            'action' => $action,
            'initialValues' => $task
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());
        return redirect()->route('tasks.index')->with('success', 'Task updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
