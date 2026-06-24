import { useState, useEffect } from 'react';
import { ImageIcon, Save, Trash2, Edit, Plus, CheckCircle } from 'lucide-react';
import Swal from 'sweetalert2';
import api from "../lib/api";
import PageHeader from '../components/PageHeader';

const AppGallery = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    // Headings State
    const [headings, setHeadings] = useState({
        featuredTitle: "",
        fullGalleryTitle: "",
        fullGallerySubtitle: ""
    });

    // Images State
    const [featuredImages, setFeaturedImages] = useState([]);
    const [fullGalleryImages, setFullGalleryImages] = useState([]);

    // Form State for Images
    const [imageForm, setImageForm] = useState({
        id: null,
        type: "featured", // 'featured' or 'full'
        image: null,
        text: "",
        order: ""
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [isEditingImage, setIsEditingImage] = useState(false);

    // UI State
    const [selectedSection, setSelectedSection] = useState("");

    useEffect(() => {
        fetchGalleryData();
    }, []);

    // Auto-fill order number when section or images change
    useEffect(() => {
        if (selectedSection && !isEditingImage) {
            const targetImages = selectedSection === "featured" ? featuredImages : fullGalleryImages;
            const nextOrder = targetImages.length > 0 
                ? Math.max(...targetImages.map(img => img.order || 0)) + 1 
                : 1;
            
            setImageForm(prev => ({
                ...prev,
                type: selectedSection,
                order: nextOrder
            }));
        }
    }, [selectedSection, featuredImages, fullGalleryImages, isEditingImage]);

    const fetchGalleryData = async () => {
        try {
            setIsLoading(true);
            const res = await api.get('/api/app-gallery');
            if (res.data.success) {
                setHeadings(res.data.data.settings);
                setFeaturedImages(res.data.data.featuredImages);
                setFullGalleryImages(res.data.data.fullGalleryImages);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch gallery data' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleHeadingChange = (e) => {
        const { name, value } = e.target;
        setHeadings(prev => ({ ...prev, [name]: value }));
    };

    const saveHeadings = async () => {
        try {
            setIsLoading(true);
            const res = await api.put('/api/app-gallery/headings', headings);
            if (res.data.success) {
                Swal.fire({ icon: 'success', title: 'Saved!', text: 'Headings updated successfully', timer: 2000, showConfirmButton: false });
            }
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to update headings' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageInputChange = (e) => {
        const { name, value } = e.target;
        setImageForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageForm(prev => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const resetImageForm = () => {
        const targetImages = selectedSection === "featured" ? featuredImages : fullGalleryImages;
        const nextOrder = targetImages.length > 0 
            ? Math.max(...targetImages.map(img => img.order || 0)) + 1 
            : 1;

        setImageForm({
            id: null,
            type: selectedSection || "featured",
            image: null,
            text: "",
            order: nextOrder
        });
        setImagePreview(null);
        setIsEditingImage(false);
    };

    const saveImage = async (e) => {
        e.preventDefault();
        
        if (!isEditingImage && !imageForm.image) {
            Swal.fire({ icon: 'warning', title: 'Required', text: 'Please select an image' });
            return;
        }

        try {
            setIsLoading(true);
            let imageBase64 = null;
            
            if (imageForm.image instanceof File) {
                imageBase64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(imageForm.image);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
            }

            const payload = {
                type: imageForm.type,
                text: imageForm.text,
                order: imageForm.order === "" ? null : Number(imageForm.order)
            };

            if (imageBase64) {
                payload.image = imageBase64;
            }

            let res;
            if (isEditingImage) {
                res = await api.put(`/api/app-gallery/images/${imageForm.id}`, payload);
            } else {
                res = await api.post('/api/app-gallery/images', payload);
            }

            if (res.data.success) {
                Swal.fire({ icon: 'success', title: 'Success', text: 'Image saved successfully', timer: 2000, showConfirmButton: false });
                resetImageForm();
                fetchGalleryData();
            }
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: error.response?.data?.message || 'Failed to save image' });
        } finally {
            setIsLoading(false);
        }
    };

    const editImage = (img) => {
        setIsEditingImage(true);
        setImageForm({
            id: img._id,
            type: img.type,
            image: null,
            text: img.text || "",
            order: img.order !== undefined ? img.order : ""
        });
        setImagePreview(img.image?.url || null);
        window.scrollTo({ top: document.getElementById('image-form').offsetTop - 100, behavior: 'smooth' });
    };

    const deleteImage = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                setIsLoading(true);
                const res = await api.delete(`/api/app-gallery/images/${id}`);
                if (res.data.success) {
                    Swal.fire('Deleted!', 'Image has been deleted.', 'success');
                    fetchGalleryData();
                }
            } catch (error) {
                Swal.fire('Error!', 'Failed to delete image.', 'error');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const ImageTable = ({ title, images }) => (
        <div className="bg-white border-2 border-gray-200 overflow-hidden shadow-lg mb-8">
            <div className="px-6 py-4 border-b bg-[#C8102E]">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
            </div>
            <div className="p-4 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <th className="p-3 border-b">Order</th>
                            <th className="p-3 border-b">Image</th>
                            <th className="p-3 border-b">Text</th>
                            <th className="p-3 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images.length > 0 ? images.map((img) => (
                            <tr key={img._id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-semibold">{img.order}</td>
                                <td className="p-3">
                                    <div className="w-24 h-16 bg-gray-200 overflow-hidden rounded">
                                        <img src={img.image?.url} alt="Gallery" className="w-full h-full object-cover" />
                                    </div>
                                </td>
                                <td className="p-3">{img.text || <span className="text-gray-400 italic">No text</span>}</td>
                                <td className="p-3">
                                    <div className="flex gap-2">
                                        <button onClick={() => editImage(img)} className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => deleteImage(img._id)} className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="p-6 text-center text-gray-500">No images found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="bg-white shadow-md mt-6 p-6 min-h-screen rounded-lg">
            <PageHeader
                title="APP GALLERY MANAGEMENT"
                description="Manage Featured Experiences and Full Gallery images for the mobile app"
            />

            {/* Select Section Dropdown */}
            <div className="bg-white border-2 border-gray-200 p-6 mb-8 shadow-lg">
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Select Section to Manage</label>
                <select
                    value={selectedSection}
                    onChange={(e) => {
                        setSelectedSection(e.target.value);
                        setIsEditingImage(false);
                    }}
                    className="w-full max-w-md px-3 py-2 border-2 border-gray-300 focus:outline-[#C8102E] focus:border-[#C8102E] text-sm rounded shadow-sm"
                >
                    <option value="">-- Choose Section --</option>
                    <option value="featured">Featured Experiences</option>
                    <option value="full">Full Gallery</option>
                </select>
            </div>

            {selectedSection && (
                <>
                    {/* Headings Section */}
                    <div className="bg-white border-2 border-gray-200 p-6 mb-8 shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-red-50 text-[#C8102E] rounded-md">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {selectedSection === 'featured' ? 'Featured Experiences Settings' : 'Full Gallery Settings'}
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {selectedSection === 'featured' && (
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Featured Experiences Title</label>
                                    <input
                                        type="text"
                                        name="featuredTitle"
                                        value={headings.featuredTitle}
                                        onChange={handleHeadingChange}
                                        className="w-full px-3 py-2 border-2 border-gray-300 focus:outline-[#C8102E] focus:border-[#C8102E] text-sm rounded shadow-sm"
                                    />
                                </div>
                            )}
                            
                            {selectedSection === 'full' && (
                                <>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Full Gallery Title</label>
                                        <input
                                            type="text"
                                            name="fullGalleryTitle"
                                            value={headings.fullGalleryTitle}
                                            onChange={handleHeadingChange}
                                            className="w-full px-3 py-2 border-2 border-gray-300 focus:outline-[#C8102E] focus:border-[#C8102E] text-sm rounded shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Full Gallery Subtitle</label>
                                        <input
                                            type="text"
                                            name="fullGallerySubtitle"
                                            value={headings.fullGallerySubtitle}
                                            onChange={handleHeadingChange}
                                            className="w-full px-3 py-2 border-2 border-gray-300 focus:outline-[#C8102E] focus:border-[#C8102E] text-sm rounded shadow-sm"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={saveHeadings}
                                disabled={isLoading}
                                className="px-6 py-2 bg-[#C8102E] text-white font-bold rounded shadow-lg hover:shadow-xl flex items-center gap-2 uppercase text-xs"
                            >
                                <Save size={16} /> Save Settings
                            </button>
                        </div>
                    </div>
                    {/* Add Image Form */}
            <div id="image-form" className="bg-white border-2 border-gray-200 p-6 mb-10 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-50 text-[#C8102E] rounded-md">
                        <ImageIcon className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                        {isEditingImage ? 'Edit Image' : 'Add New Image'}
                    </h2>
                </div>

                <form onSubmit={saveImage}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Section *</label>
                            <input
                                type="text"
                                readOnly
                                value={selectedSection === 'featured' ? 'Featured Experiences' : 'Full Gallery'}
                                className="w-full px-3 py-2 border-2 border-gray-300 bg-gray-100 text-gray-500 text-sm rounded shadow-sm cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Optional Text</label>
                            <input
                                type="text"
                                name="text"
                                value={imageForm.text}
                                onChange={handleImageInputChange}
                                placeholder="e.g. WEDDINGS"
                                className="w-full px-3 py-2 border-2 border-gray-300 focus:outline-[#C8102E] focus:border-[#C8102E] text-sm rounded shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Order Number</label>
                            <input
                                type="number"
                                name="order"
                                value={imageForm.order}
                                onChange={handleImageInputChange}
                                placeholder="Auto-assigned if empty"
                                className="w-full px-3 py-2 border-2 border-gray-300 focus:outline-[#C8102E] focus:border-[#C8102E] text-sm rounded shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Upload Image {!isEditingImage && '*'}</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 border-2 border-gray-300 text-sm rounded shadow-sm"
                            />
                            {imagePreview && (
                                <div className="mt-2 w-32 h-20 border border-gray-200 rounded overflow-hidden">
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                        {isEditingImage && (
                            <button
                                type="button"
                                onClick={resetImageForm}
                                className="px-6 py-2 bg-gray-500 text-white font-bold rounded shadow hover:bg-gray-600 uppercase tracking-wider text-xs"
                            >
                                Cancel Edit
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-[#C8102E] text-white font-bold rounded shadow-lg hover:shadow-xl flex items-center gap-2 uppercase tracking-widest text-xs disabled:opacity-50"
                        >
                            <Save size={16} /> {isEditingImage ? 'Update Image' : 'Add Image'}
                        </button>
                    </div>
                </form>
            </div>

                    {/* Tables */}
                    {selectedSection === "featured" && (
                        <ImageTable title="Featured Experiences Images" images={featuredImages} />
                    )}
                    {selectedSection === "full" && (
                        <ImageTable title="Full Gallery Images" images={fullGalleryImages} />
                    )}
                </>
            )}

        </div>
    );
};

export default AppGallery;
