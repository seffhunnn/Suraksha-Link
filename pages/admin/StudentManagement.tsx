
import React, { useState, useMemo, useContext } from 'react';
import { Icons } from '../../components/icons';
import { MOCK_STUDENT_PROGRESS } from '../../constants';
import type { StudentProgress } from '../../types';
import { AppContext } from '../../App';

const ITEMS_PER_PAGE = 10;

const StudentManagement: React.FC = () => {
    const { t } = useContext(AppContext);
    const [students, setStudents] = useState<StudentProgress[]>(MOCK_STUDENT_PROGRESS);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleAddStudent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newStudent: StudentProgress = {
            id: `S${Date.now()}`,
            studentName: formData.get('studentName') as string,
            class: formData.get('class') as string,
            preparednessScore: 0,
            drillsCompleted: 0,
            modulesCompleted: 0,
            certification: 'Not Started',
        };
        setStudents(prev => [newStudent, ...prev]);
        handleCloseModal();
    };
    
    const filteredStudents = useMemo(() => {
        return students.filter(student =>
            student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, students]);

    const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
    const paginatedStudents = filteredStudents.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const getCertificationPill = (status: StudentProgress['certification']) => {
        switch (status) {
            case 'Certified': return 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200';
            case 'In Progress': return 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200';
            case 'Not Started': return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <div className="animate-fade-in-up">
            <h1 className="text-3xl font-bold mb-6">{t('admin.students.title')}</h1>

            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <div className="relative w-full sm:max-w-xs">
                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t('admin.students.search')}
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <Icons.Filter className="h-4 w-4 mr-2" />
                            {t('admin.students.filter')}
                        </button>
                        <button onClick={handleOpenModal} className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                            <Icons.User className="h-4 w-4 mr-2" />
                            {t('admin.students.add')}
                        </button>
                    </div>
                </div>

                {/* Student Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">{t('admin.students.table.name')}</th>
                                <th scope="col" className="px-6 py-3">{t('admin.students.table.class')}</th>
                                <th scope="col" className="px-6 py-3">{t('admin.students.table.score')}</th>
                                <th scope="col" className="px-6 py-3">{t('admin.students.table.certification')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedStudents.map(student => (
                                <tr 
                                    key={student.id} 
                                    className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{student.studentName}</td>
                                    <td className="px-6 py-4">{student.class}</td>
                                    <td className="px-6 py-4">{student.preparednessScore}%</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCertificationPill(student.certification)}`}>
                                            {student.certification}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                        {t('admin.students.showingResults', {
                            start: Math.min(1 + (currentPage - 1) * ITEMS_PER_PAGE, filteredStudents.length),
                            end: Math.min(currentPage * ITEMS_PER_PAGE, filteredStudents.length),
                            total: filteredStudents.length
                        })}
                    </span>
                    <div className="flex items-center space-x-1">
                        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"><Icons.ChevronFirst className="h-5 w-5"/></button>
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"><Icons.ChevronLeft className="h-5 w-5"/></button>
                        <span className="px-3 py-1 text-sm font-medium">{currentPage > 0 ? currentPage : 1} / {totalPages > 0 ? totalPages : 1}</span>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0} className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"><Icons.ChevronRight className="h-5 w-5"/></button>
                         <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages || totalPages === 0} className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"><Icons.ChevronLast className="h-5 w-5"/></button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                 <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
                        <form onSubmit={handleAddStudent}>
                            <div className="p-6 border-b dark:border-gray-700">
                                <h2 className="text-xl font-bold">{t('admin.students.modal.addTitle')}</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.students.modal.nameLabel')}</label>
                                    <input type="text" name="studentName" id="studentName" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                                <div>
                                    <label htmlFor="class" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.students.modal.classLabel')}</label>
                                    <input type="text" name="class" id="class" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 flex justify-end space-x-3 rounded-b-xl">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">{t('admin.students.modal.cancel')}</button>
                                <button type="submit" className="px-4 py-2 text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">{t('admin.students.modal.addBtn')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentManagement;
