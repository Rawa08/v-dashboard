'use client';

import { useState } from 'react';

type Props = {
    venueId: string;
    onUploadComplete: () => void;
};

export default function UploadForm({ venueId, onUploadComplete }: Props) {
    const [files, setFiles] = useState<FileList | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(e.target.files);
    };

    const handleUpload = async () => {
        if (!files || files.length === 0) return;

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        formData.append('venueId', venueId);

        setUploading(true);

        try {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
            const res = await fetch(`${baseUrl}/api/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            onUploadComplete();
        } catch (err) {
            console.error('Upload error:', err);
        } finally {
            setUploading(false);
            setFiles(null);
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow space-y-4">
            <h2 className="text-lg font-semibold">Upload Images</h2>
            <div className="space-y-8 max-w-md">
                <input type="file" accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="w-full text-slate-500 font-medium text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" />
            </div>
            {files && (
                <ul className="text-sm text-gray-700 list-disc list-inside">
                    {Array.from(files).map((file, idx) => (
                        <li key={idx}>{file.name}</li>
                    ))}
                </ul>
            )}

            <button
                onClick={handleUpload}
                disabled={uploading || !files}
                className="flex bg-gray-800 hover:bg-gray-700 text-white text-base font-medium px-4 py-2.5 outline-none rounded w-max cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 mr-2 fill-white inline" viewBox="0 0 32 32">
                    <path
                        d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                        data-original="#000000" />
                    <path
                        d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                        data-original="#000000" />
                </svg>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
}
