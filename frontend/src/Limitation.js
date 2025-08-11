
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

const tabs = ['Defect Entry',  'Remove Limitation'];

const LimitationForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [serialNo] = useState('01');
  const [afHrs, setAfHrs] = useState('Fetching...');
  const [userDetails, setUserDetails] = useState({ name: '', rank: '' });

  const {
    register,
    handleSubmit,
    watch,
  } = useForm();

  const authCode = watch('authCode');

  useEffect(() => {
    setTimeout(() => setAfHrs('2456 HRS'), 500);

    if (authCode === 'AUTH123') {
      setUserDetails({ name: 'PANDA ODIYA', rank: 'POELA' });
    }
  }, [authCode]);

  const onSubmit = (data: any) => {
    console.log(data);
    alert('Form submitted successfully!');
  };

  const FloatingLabel = ({ label }: { label: string }) => (
    <span className="absolute left-0 -top-4 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-500">
      {label}
    </span>
  );

  const renderTab = () => {
    switch (activeTab) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-600">🛠️ Defect Details</h2>

            <div className="relative">
              <input
                {...register('defectName')}
                placeholder="Defect Name"
                className="peer h-14 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none"
              />
              <FloatingLabel label="Defect Name" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <input
                  value={serialNo}
                  disabled
                  placeholder="Serial No"
                  className="peer h-14 w-full border-b-2 border-gray-300 text-gray-500 bg-transparent placeholder-transparent focus:outline-none"
                />
                <FloatingLabel label="Serial No. (Auto)" />
              </div>

              <div className="relative">
                <input
                  value={afHrs}
                  disabled
                  placeholder="AF Hrs"
                  className="peer h-14 w-full border-b-2 border-gray-300 text-gray-500 bg-transparent placeholder-transparent focus:outline-none"
                />
                <FloatingLabel label="AF Hrs" />
              </div>

              <div className="relative">
                <select
                  {...register('trade')}
                  defaultValue=""
                  className="peer h-14 w-full border-b-2 border-gray-300 bg-transparent text-gray-900 focus:outline-none"
                >
                  <option value="" disabled hidden></option>
                  <option value="AE">AE</option>
                  <option value="AL">AL</option>
                  <option value="AR">AR</option>
                  <option value="AO">AO</option>
                </select>
                <FloatingLabel label="Trade" />
              </div>
            </div>

            <div className="relative">
              <textarea
                {...register('defectDesc')}
                rows={4}
                placeholder="Defect Description"
                className="peer w-full border-b-2 border-gray-300 placeholder-transparent text-gray-900 focus:border-blue-500 focus:outline-none resize-none"
              />
              <FloatingLabel label="Defect Description" />
            </div>

            <div className="relative">
              <input
                {...register('authCode')}
                placeholder="Enter Auth Code"
                className="peer h-14 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none"
              />
              <FloatingLabel label="Authorization Code" />
              {userDetails.name && (
                <p className="mt-2 text-green-600">
                  ✅ Authorized by  {userDetails.name}  {userDetails.rank}
                </p>
              )}
            </div>

              <div className="relative">
              <input
                {...register('affectedSystem')}
                placeholder="Systems Affected"
                className="peer h-14 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none"
              />
              <FloatingLabel label="Systems Affected" />
            </div>

            <div className="relative">
              <input
                type="date"
                {...register('deferDate')}
                className="peer h-14 w-full border-b-2 border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none"
              />
              <FloatingLabel label="Deferred Until Date" />
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-600">❌ Remove Limitation</h2>

            <div className="relative">
              <input
                {...register('removalSNOW')}
                placeholder="SNOW Number"
                className="peer h-14 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none"
              />
              <FloatingLabel label="SNOW Number" />
            </div>

            <div className="relative">
              <input
                type="date"
                {...register('removalDate')}
                className="peer h-14 w-full border-b-2 border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none"
              />
              <FloatingLabel label="Removal Date" />
            </div>

            <div className="relative">
              <input
                {...register('authCode')}
                placeholder="Enter Auth Code"
                className="peer h-14 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none"
              />
              <FloatingLabel label="Authorization Code" />
              {userDetails.name && (
                <p className="mt-2 text-green-600">
                  ✅ Authorized by  {userDetails.name}  {userDetails.rank}
                </p>
              )}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Info Bar */}
      <aside className="md:w-1/5 bg-blue-100 text-blue-900 p-6">
        <h3 className="text-xl font-semibold mb-4">📘 Limitation Info</h3>
        <p className="leading-relaxed">
          <strong>Note:</strong> The limitation you place may impact operational systems.
          Ensure systems are recorded and deferred dates are chosen carefully.
        </p>
        <ul className="list-disc list-inside mt-4 space-y-1">
          <li>Confirm affected systems</li>
          <li>Ensure valid trade selection</li>
          <li>Use valid auth code for approval</li>
        </ul>
      </aside>

      {/* Form Section */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Aircraft Defect Limitation Form
        </h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                index === activeTab
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {renderTab()}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-md font-bold shadow-md"
          >
            🚀 Submit Form
          </motion.button>
        </form>
      </main>
    </div>
  );
};

export default LimitationForm;