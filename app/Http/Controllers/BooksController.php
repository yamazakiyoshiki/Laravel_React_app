<?php

namespace App\Http\Controllers;

use App\Models\Books;
use Illuminate\Http\Request;
use inertia\Inertia;

class BooksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Books::all();
        return Inertia::render('Books/index', ['books' => $books, 'message' => session('message')]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:20',
            'content' => 'required|max:100',
            'category' => 'required|max:10',
        ]);
        $book = new Books($request->input());
        $book->save();
        return redirect('books')->with([
            'message' => '登録しました',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Books $books)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $book = Books::find($id);
        $book->fill($request->input())->saveOrFail();
        return redirect('book')->with([
            'message' => '更新しました',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $book = Books::find($id);
        $book->delete();
        return redirect('books')->with([
            'message' => '削除しました',
        ]);
    }
}
