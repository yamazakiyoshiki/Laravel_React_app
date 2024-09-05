import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import DangerButton from '@/Components/DangerButton';
import BlueButton from '@/Components/BlueButton';
import GreenButton from '@/Components/GreenButton';
import TextareaInput from '@/Components/TextareaInput';
import Select from '@/Components/Select';


export default function Dashboard({ auth, books, message }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const [confirmingBookUpdate, setConfirmingBookUpdate] = useState(false);
    const passwordInput = useRef();
    const titleInput = useRef();
    const categoryInput = useRef();

    const {
        data,
        setData,
        delete: destroy,post,put,
        processing,
        reset,
        errors,
    } = useForm({
        password: '', title: '', content: '', category: ''
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const confirmBookUpdate = (id, title, content, category) => {
      setData({id: id, title: title, content: content, category: category});
        setConfirmingBookUpdate(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        post(route('books.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const updateBook = (e) => {
        e.preventDefault();

        put(route('books.update', data.id), {
            preserveScroll: true,
            onSuccess: () => closeModal_u(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const deleteBook = (id) => {
        destroy(route('books.destroy', id), {
            preserveScroll: true,
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    const closeModal_u = () => {
        setConfirmingBookUpdate(false);

        reset();
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Books</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <BlueButton onClick={confirmUserDeletion}>登録</BlueButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to insert new book?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                    </p>

                    <div className="mt-6">
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            ref={titleInput}
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="title"
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <TextareaInput
                            id="content"
                            type="text"
                            name="content"
                            ref={titleInput}
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="mt-1 block w-3/4"
                            placeholder="content"
                        >
                        </TextareaInput>
                        <InputError message={errors.content} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <Select
                            id="category"
                            name="category"
                            ref={categoryInput}
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="mt-1 block w-3/4"
                            placeholder="category"
                            options={['', 'React', 'Vue', 'Laravel']}
                      >
                      </Select>
                        <InputError message={errors.category} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <BlueButton className="ms-3" disabled={processing}>
                            登録する
                        </BlueButton>
                    </div>
                </form>
            </Modal>

            <Modal show={confirmingBookUpdate} onClose={closeModal_u}>
                <form onSubmit={updateBook} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to update this book?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                    </p>

                    <div className="mt-6">
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            ref={titleInput}
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="title"
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <TextareaInput
                            id="content"
                            type="text"
                            name="content"
                            ref={titleInput}
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="mt-1 block w-3/4"
                            placeholder="content"
                        >
                        </TextareaInput>
                        <InputError message={errors.content} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <Select
                            id="category"
                            name="category"
                            ref={categoryInput}
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="mt-1 block w-3/4"
                            placeholder="category"
                            options={['', 'React', 'Vue', 'Laravel']}
                      >
                      </Select>
                        <InputError message={errors.category} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal_u}>Cancel</SecondaryButton>

                        <BlueButton className="ms-3" disabled={processing}>
                            更新する
                        </BlueButton>
                    </div>
                </form>
            </Modal>
            {message && <div className='mt-2 text-blue-100 p-3 rounded-lg text-center font-bold'>{message}</div>}
                    <div>
                      <table className='w-full bg-gray-100 ml-2'>
                        <thead className='bg-blue-100'>
                          <tr className='text-green-600'>
                            <th className='px-2 py-2 border border-gray-400'>
                              #
                            </th>
                            <th className='px-2 py-2 border border-gray-400'>
                              Title
                            </th>
                            <th className='px-2 py-2 border border-gray-400'>
                              Content
                            </th>
                            <th className='px-2 py-2 border border-gray-400'>
                              Category
                            </th>
                            <th className='px-2 py-2 border border-gray-400'></th>
                            <th className='px-2 py-2 border border-gray-400'></th>
                          </tr>
                        </thead>
                        <tbody className='bg-white'>
                          {books.map((book => (
                            <tr key={book.id}>
                              <td className='border border-gray-400 px-2 py-2 text-center'>
                                {book.id}
                              </td>
                              <td className='border border-gray-400 px-2 py-2'>
                                {book.title}
                              </td>
                              <td className='border border-gray-400 px-2 py-2'>
                                {book.content}
                              </td>
                              <td className='border border-gray-400 px-2 py-2'>
                                {book.category}
                              </td>
                              <td className='border border-gray-400 px-2 py-2 text-center'>
                                <GreenButton onClick={() => confirmBookUpdate(book.id, book.title, book.content, book.category)}>
                                  編集
                                </GreenButton>
                              </td>
                              <td className='border border-gray-400 px-2 py-2 text-center'>
                                <DangerButton onClick={() => deleteBook(book.id)}>
                                  削除
                                </DangerButton>
                              </td>
                            </tr>
                          )))}
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
