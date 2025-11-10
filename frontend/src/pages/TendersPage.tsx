import { FileCheck } from 'lucide-react';

export const TendersPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenders</h1>
          <p className="text-gray-600 mt-1">Create and track tender submissions</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <FileCheck className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Tender Management</h3>
        <p className="text-gray-600 mb-4">
          Manage tender opportunities, submissions, and track outcomes efficiently.
        </p>
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Create</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Tender documents</li>
              <li>• Scope of work</li>
              <li>• Cost estimates</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Track</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Submission status</li>
              <li>• Deadlines</li>
              <li>• Requirements</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Outcomes</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Win/loss tracking</li>
              <li>• Contract awards</li>
              <li>• Performance metrics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
