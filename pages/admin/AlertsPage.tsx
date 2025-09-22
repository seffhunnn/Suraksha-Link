
import React, { useState, useContext } from 'react';
import { Icons } from '../../components/icons';
import { MOCK_ALERTS } from '../../constants';
import AlertCard from '../../components/AlertCard';
import type { Alert } from '../../types';
import { AlertSeverity } from '../../types';
import { AppContext } from '../../App';

const AlertsPage: React.FC = () => {
    const { t, language } = useContext(AppContext);
    const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);
    
    // Form state
    const [titleEn, setTitleEn] = useState('');
    const [titleHi, setTitleHi] = useState('');
    const [messageEn, setMessageEn] = useState('');
    const [messageHi, setMessageHi] = useState('');
    const [severity, setSeverity] = useState<AlertSeverity>(AlertSeverity.Advisory);
    const [region, setRegion] = useState('School Campus');
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAlert, setEditingAlert] = useState<Alert | null>(null);

    const handleSendAlert = (e: React.FormEvent) => {
        e.preventDefault();
        const newAlert: Alert = {
            id: `A${Date.now()}`,
            title: { en: titleEn, hi: titleHi },
            severity,
            region,
            message: { en: messageEn, hi: messageHi },
            timestamp: new Date().toISOString(),
            date: new Date().toISOString().split('T')[0],
        };
        setAlerts([newAlert, ...alerts]);
        // Reset form
        setTitleEn('');
        setTitleHi('');
        setMessageEn('');
        setMessageHi('');
        setSeverity(AlertSeverity.Advisory);
        setRegion('School Campus');
    };
    
    const handleOpenEditModal = (alertData: Alert) => {
        setEditingAlert(alertData);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingAlert(null);
    };

    const handleSaveAlert = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updatedAlertData = {
            title: {
                en: formData.get('title_en') as string,
                hi: formData.get('title_hi') as string,
            },
            severity: formData.get('severity') as AlertSeverity,
            message: {
                en: formData.get('message_en') as string,
                hi: formData.get('message_hi') as string,
            },
            region: formData.get('region') as string,
        };

        if (editingAlert) {
            setAlerts(alerts.map(a => a.id === editingAlert.id ? { ...a, ...updatedAlertData } : a));
        }
        handleCloseModal();
    };

    return (
        <div className="animate-fade-in-up">
            <h1 className="text-3xl font-bold mb-6">{t('admin.alerts.title')}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Send Alert Form */}
                <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg h-fit">
                    <h2 className="text-xl font-bold mb-4">{t('admin.alerts.createTitle')}</h2>
                    <form onSubmit={handleSendAlert} className="space-y-4">
                        <div>
                            <label htmlFor="title_en" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.alerts.form.title')} (English)</label>
                            <input type="text" id="title_en" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                        </div>
                        <div>
                            <label htmlFor="title_hi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.alerts.form.title')} (हिन्दी)</label>
                            <input type="text" id="title_hi" value={titleHi} onChange={(e) => setTitleHi(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                        </div>
                        <div>
                             <label htmlFor="severity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.alerts.form.severity')}</label>
                             <select id="severity" value={severity} onChange={(e) => setSeverity(e.target.value as AlertSeverity)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                                {Object.values(AlertSeverity).map(s => <option key={s} value={s}>{s}</option>)}
                             </select>
                        </div>
                         <div>
                            <label htmlFor="region" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.alerts.form.region')}</label>
                            <input type="text" id="region" value={region} onChange={(e) => setRegion(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                        </div>
                        <div>
                            <label htmlFor="message_en" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.alerts.form.message')} (English)</label>
                            <textarea id="message_en" rows={3} value={messageEn} onChange={(e) => setMessageEn(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"></textarea>
                        </div>
                         <div>
                            <label htmlFor="message_hi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.alerts.form.message')} (हिन्दी)</label>
                            <textarea id="message_hi" rows={3} value={messageHi} onChange={(e) => setMessageHi(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"></textarea>
                        </div>
                        <button type="submit" className="w-full flex items-center justify-center px-4 py-3 text-md font-medium rounded-md text-white bg-danger-600 hover:bg-danger-700 disabled:bg-gray-400" disabled={!titleEn || !messageEn}>
                           <Icons.Siren className="h-5 w-5 mr-2"/> {t('admin.alerts.form.send')}
                        </button>
                    </form>
                </div>
                
                {/* Alert History */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold mb-4">{t('admin.alerts.history')}</h2>
                    <div className="space-y-4">
                        {alerts.map(alert => (
                            <div key={alert.id} className="relative group">
                                <AlertCard alert={alert} />
                                <div className="absolute top-2 right-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleOpenEditModal(alert)} className="p-2 bg-white/80 dark:bg-gray-800/80 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary-500 hover:bg-white"><Icons.Pencil className="h-4 w-4" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {isModalOpen && editingAlert && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
                        <form onSubmit={handleSaveAlert}>
                            <div className="p-6 border-b dark:border-gray-700">
                                <h2 className="text-xl font-bold">{t('admin.alerts.modal.editTitle')}</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label htmlFor="edit-title_en" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.alerts.form.title')} (English)</label>
                                    <input type="text" name="title_en" id="edit-title_en" defaultValue={editingAlert.title.en} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                                 <div>
                                    <label htmlFor="edit-title_hi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.alerts.form.title')} (हिन्दी)</label>
                                    <input type="text" name="title_hi" id="edit-title_hi" defaultValue={editingAlert.title.hi} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                                <div>
                                    <label htmlFor="edit-severity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.alerts.form.severity')}</label>
                                    <select name="severity" id="edit-severity" defaultValue={editingAlert.severity} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                                        {Object.values(AlertSeverity).map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="edit-region" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.alerts.form.region')}</label>
                                    <input type="text" name="region" id="edit-region" defaultValue={editingAlert.region} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                                <div>
                                    <label htmlFor="edit-message_en" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.alerts.form.message')} (English)</label>
                                    <textarea name="message_en" id="edit-message_en" rows={3} defaultValue={editingAlert.message.en} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"></textarea>
                                </div>
                                 <div>
                                    <label htmlFor="edit-message_hi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.alerts.form.message')} (हिन्दी)</label>
                                    <textarea name="message_hi" id="edit-message_hi" rows={3} defaultValue={editingAlert.message.hi} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"></textarea>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 flex justify-end space-x-3 rounded-b-xl">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">{t('admin.drills.modal.cancel')}</button>
                                <button type="submit" className="px-4 py-2 text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">{t('admin.alerts.modal.save')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AlertsPage;
