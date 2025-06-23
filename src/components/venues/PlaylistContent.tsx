'use client';

import React, { useState } from 'react';
import type { PlayList } from '@/types/venue';
import { UploadCloud } from 'lucide-react';
import { showError } from '@/lib/toast';

export type PlaylistContentProps = {
    playlist: PlayList;
    onUploadComplete: () => void;
};

const PlaylistContent: React.FC<PlaylistContentProps> = ({ playlist, onUploadComplete }) => {

    const [files, setFiles] = useState<FileList | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(e.target.files);
    };

    const handleUpload = async () => {
        if (!files || files.length === 0) {
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        formData.append('playListId', playlist.id);

        setUploading(true);

        try {

            const res = await fetch('/api/venue/upload/imageUpload', { method: 'POST', body: formData });

            if (!res.ok) throw new Error('Upload failed');

            onUploadComplete();
        } catch (err) {
            showError(`Failed to upload ${files.length} images`);
        } finally {
            setUploading(false);
            setFiles(null);
        }
    };
    return (
        <div className="px-4 py-6">

            <h2 className="text-2xl font-semibold mb-6">{playlist.category}</h2>


            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {playlist.images.map((img) => (
                    <div
                        key={img.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-md aspect-square">
                        <img
                            src={img.url}
                            alt={`Image ${img.id}`}
                            className="object-cover w-full h-full"
                        />
                    </div>
                ))}
                <div className="flex flex-col items-center justify-center bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 aspect-square hover:bg-gray-200">
                    {!files && (<label htmlFor="file-upload" >
                        <UploadCloud size={36} className="text-gray-500 mb-2 cursor-pointer" />
                        <span className="text-gray-600 text-sm cursor-pointer">Upload Image</span>
                        <input id="file-upload" type="file" accept="image/*"
                            multiple
                            onChange={handleFileChange} className="hidden" />
                    </label>)}

                    {files && (
                        <>
                            <ul className="text-sm text-gray-700 m-auto list-none list-inside">
                                {Array.from(files).map((file, idx) => (
                                    <li key={idx}>{file.name}</li>
                                ))}
                            </ul>
                            <div className="mt-auto flex flex-col space-y-2 w-full p-3">
                                <button
                                    type="button"
                                    onClick={handleUpload}
                                    disabled={uploading}
                                    className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-100 text-base font-medium px-4 py-2 rounded w-full"
                                >
                                    <UploadCloud className="mr-2" />
                                    {uploading ? 'Uploading...' : 'Upload'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFiles(null)}
                                    disabled={uploading}
                                    className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-100 text-base font-medium px-4 py-2 rounded w-full"
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

        </div>
    );
};

export default PlaylistContent;
