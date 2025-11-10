import { TrendingUp } from 'lucide-react';

export const VariationsPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Variations & Day Work</h1>
          <p className="text-gray-600 mt-1">Track variations and day work orders</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <TrendingUp className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Variations & Day Work Tracker</h3>
        <p className="text-gray-600 mb-4">
          Track project variations, scope changes, and day work orders with detailed cost breakdowns.
        </p>
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Variations</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Variation requests</li>
              <li>• Approval tracking</li>
              <li>• Cost estimates</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Day Work</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Labour hours tracking</li>
              <li>• Materials tracking</li>
              <li>• Daily records</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
