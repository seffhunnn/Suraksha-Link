
import React, { useContext, useMemo, useState } from 'react';
import { Icons } from '../../components/icons';
import { MOCK_EMERGENCY_CONTACTS, MASTER_ALERT_LIST, CITIES_OPTIONS } from '../../constants';
import AlertCard from '../../components/AlertCard';
import type { EmergencyContact } from '../../types';
import { AppContext } from '../../App';

const DirectoryPage: React.FC = () => {
    const { user, t } = useContext(AppContext);
    const [selectedCity, setSelectedCity] = useState(user?.location || 'Patna');
    const [message, setMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastAnimationClass, setToastAnimationClass] = useState('');

    const liveAlerts = useMemo(() => {
        const todayString = new Date().toISOString().split('T')[0];
        
        return MASTER_ALERT_LIST.filter(alert => 
            alert.date === todayString && alert.region.includes(selectedCity)
        );
    }, [selectedCity]);

    const nationalContacts = MOCK_EMERGENCY_CONTACTS.filter(c => c.category === 'National');
    const localContacts = MOCK_EMERGENCY_CONTACTS.filter(c => c.category === 'Local');
    const schoolContacts = MOCK_EMERGENCY_CONTACTS.filter(c => c.category === 'School');

    const handleSendMessage = () => {
        if (message.trim() === '' || showToast) return;

        console.log(`Message sent: "${message}"`);
        setMessage('');

        setShowToast(true);
        setToastAnimationClass('animate-modal-in');

        // Timer to start fade out
        setTimeout(() => {
            setToastAnimationClass('animate-modal-out');
        }, 2500);

        // Timer to remove from DOM after fade-out animation completes
        setTimeout(() => {
            setShowToast(false);
            setToastAnimationClass('');
        }, 2800); // 2500ms visible + 300ms fade-out
    };

    return (
        <div className="animate-fade-in-up">
             {showToast && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                    <div className={`bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-6 rounded-xl shadow-2xl flex flex-col items-center gap-4 text-center ${toastAnimationClass}`}>
                        <div className="bg-success-100 dark:bg-success-900 p-3 rounded-full">
                           <Icons.CheckCircle className="h-12 w-12 text-success-500" />
                        </div>
                        <span className="font-bold text-xl">{t('directory.messageSent')}</span>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{t('directory.messageSentDesc')}</p>
                    </div>
                </div>
            )}
            <h1 className="text-3xl font-bold mb-2">{t('directory.title')}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{t('directory.subtitle')}</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contacts */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">{t('directory.contactsTitle')}</h2>
                    <div className="space-y-6 animate-stagger-children">
                        <ContactSection title={t('directory.nationalHelplines')} contacts={nationalContacts} icon={Icons.Shield} />
                        <ContactSection title={t('directory.localAuthorities')} contacts={localContacts} icon={Icons.MapPin} />
                        <ContactSection title={t('directory.schoolContacts')} contacts={schoolContacts} icon={Icons.Users} />
                    </div>
                     {/* Quick Message */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">{t('directory.quickMessage')}</h2>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                           <textarea 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={t('directory.messagePlaceholder')}
                                rows={3}
                                className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                           />
                           <button
                                onClick={handleSendMessage}
                                disabled={!message.trim()}
                                className="mt-3 w-full sm:w-auto flex items-center justify-center px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                               <Icons.Send className="h-4 w-4 mr-2"/>
                               {t('directory.send')}
                           </button>
                        </div>
                    </div>
                </div>

                {/* Live Alerts */}
                <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="flex justify-between items-center mb-4">
                         <h2 className="text-2xl font-bold">{t('directory.liveAlerts')}</h2>
                         <select 
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
                         >
                            {CITIES_OPTIONS.map(city => (
                                <option key={city.value} value={city.value}>{city.label}</option>
                            ))}
                         </select>
                    </div>
                    <div className="space-y-4">
                        {liveAlerts.length > 0 ? (
                            liveAlerts.map(alert => (
                                <AlertCard key={alert.id} alert={alert} />
                            ))
                        ) : (
                            <div className="bg-success-50 dark:bg-success-900/30 border-l-4 border-success-500 text-success-800 dark:text-success-200 p-4 rounded-r-lg">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <Icons.CheckCircle className="h-5 w-5 text-success-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium">{t('directory.allClear')}</h3>
                                        <div className="mt-2 text-sm">
                                            <p>{t('directory.allClearDesc', { city: selectedCity })}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ContactSection: React.FC<{title: string; contacts: EmergencyContact[]; icon: React.ComponentType<{className?: string}>}> = ({ title, contacts, icon: Icon }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="flex items-center text-xl font-bold mb-4">
            <Icon className="h-6 w-6 mr-3 text-primary-500" />
            {title}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contacts.map(contact => (
                <a key={contact.name} href={`tel:${contact.number}`} className="group p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-between hover:bg-primary-50 dark:hover:bg-primary-900/50 transition-colors">
                    <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{contact.name}</p>
                        <p className="text-lg text-primary-600 dark:text-primary-400 font-mono tracking-wider">{contact.number}</p>
                    </div>
                    <Icons.Phone className="h-6 w-6 text-gray-400 group-hover:text-primary-500" />
                </a>
            ))}
        </div>
    </div>
)

export default DirectoryPage;
