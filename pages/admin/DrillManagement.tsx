
import React, { useState, useContext } from 'react';
import { Icons } from '../../components/icons';
import { MOCK_DRILLS } from '../../constants';
import type { Drill } from '../../types';
import { AppContext } from '../../App';

const DrillManagement: React.FC = () => {
    const { language, t } = useContext(AppContext);
    const [drills, setDrills] = useState<Drill[]>(MOCK_DRILLS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDrill, setCurrentDrill] = useState<Drill | null>(null);

    const handleOpenModal = (drill: Drill | null = null) => {
        setCurrentDrill(drill);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentDrill(null);
    };

    const handleSaveDrill = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newDrillData = {
            title: {
                en: formData.get('title_en') as string,
                hi: formData.get('title_hi') as string,
            },
            type: {
                en: formData.get('type_en') as string,
                hi: formData.get('type_hi') as string,
            },
            scheduledAt: new Date(formData.get('scheduledAt') as string),
        };

        if (currentDrill) { // Editing existing drill
            setDrills(drills.map(d => d.id === currentDrill.id ? { ...d, ...newDrillData } : d));
        } else { // Adding new drill
            const newDrill: Drill = { id: `D${Date.now()}`, ...newDrillData };
            setDrills([newDrill, ...drills]);
        }
        handleCloseModal();
    };

    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{t('admin.drills.title')}</h1>
                <button onClick={() => handleOpenModal()} className="flex items-center justify-center px-4 py-2 text-md font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                    <Icons.CalendarPlus className="h-5 w-5 mr-2" />
                    {t('admin.drills.scheduleNew')}
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-4">{t('admin.drills.upcomingAndPast')}</h3>
                <div className="space-y-4">
                    {drills.length > 0 ? drills.map(drill => (
                        <div key={drill.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 dark:border-gray-700">
                            <div>
                                <p className="font-semibold text-lg">{drill.title[language]}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Type: {drill.type[language]}</p>
                                <p className="text-sm font-medium text-primary-800 dark:text-primary-200 mt-1">
                                    Scheduled for: {drill.scheduledAt.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                                <button onClick={() => handleOpenModal(drill)} className="p-2 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"><Icons.Pencil className="h-5 w-5"/></button>
                            </div>
                        </div>
                    )) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 py-4">{t('admin.drills.noDrills')}</p>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
                        <form onSubmit={handleSaveDrill}>
                            <div className="p-6 border-b dark:border-gray-700">
                                <h2 className="text-xl font-bold">{currentDrill ? t('admin.drills.modal.editTitle') : t('admin.drills.modal.addTitle')}</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label htmlFor="title_en" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.drills.modal.titleLabel')} (English)</label>
                                    <input type="text" name="title_en" id="title_en" defaultValue={currentDrill?.title.en} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                                 <div>
                                    <label htmlFor="title_hi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.drills.modal.titleLabel')} (हिन्दी)</label>
                                    <input type="text" name="title_hi" id="title_hi" defaultValue={currentDrill?.title.hi} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                                <div>
                                    <label htmlFor="type_en" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.drills.modal.typeLabel')} (English)</label>
                                    <input type="text" name="type_en" id="type_en" defaultValue={currentDrill?.type.en} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                                <div>
                                    <label htmlFor="type_hi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.drills.modal.typeLabel')} (हिन्दी)</label>
                                    <input type="text" name="type_hi" id="type_hi" defaultValue={currentDrill?.type.hi} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                                <div>
                                    <label htmlFor="scheduledAt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.drills.modal.dateLabel')}</label>
                                    <input type="date" name="scheduledAt" id="scheduledAt" defaultValue={currentDrill?.scheduledAt.toISOString().split('T')[0]} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 flex justify-end space-x-3 rounded-b-xl">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">{t('admin.drills.modal.cancel')}</button>
                                <button type="submit" className="px-4 py-2 text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">{t('admin.drills.modal.save')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DrillManagement;
