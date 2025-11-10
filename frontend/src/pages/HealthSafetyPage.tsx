import { Shield } from 'lucide-react';

export const HealthSafetyPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Health & Safety</h1>
          <p className="text-gray-600 mt-1">Manage H&S documents and compliance</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Health & Safety Document Manager</h3>
        <p className="text-gray-600 mb-4">
          Centralized repository for all health and safety documentation with version control and compliance tracking.
        </p>
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Documents</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Site safety plans</li>
              <li>• Risk assessments</li>
              <li>• Method statements</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Compliance</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Incident reports</li>
              <li>• Hazard registers</li>
              <li>• Safety inductions</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Tracking</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Document versions</li>
              <li>• Expiry dates</li>
              <li>• Approval status</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
